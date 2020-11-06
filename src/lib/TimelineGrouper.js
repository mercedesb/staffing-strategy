import { benchPeopleSort, displayName, isEngineer, isDesigner, isEngagementMgr } from "lib";
// import dayjs from "dayjs";
// import weekOfYear from "dayjs/plugin/weekOfYear";
// dayjs.extend(AdvancedFormat);

const engineeringColor = "#A3CCCD";
const designColor = "#FFEAB1";
const engagementColor = "#717244";
const projectColor = "#0B2D48";
const benchColor = "#FF694E";

const darkText = "#000";
const lightText = "#FFF";

const itemStylesForPerson = (person) => {
  let backgroundColor = projectColor;
  let fontColor = lightText;

  if (person.firstName.includes("Staffing Need")) {
    backgroundColor = null;
    fontColor = darkText;
  } else {
    if (isEngineer(person)) {
      backgroundColor = engineeringColor;
      fontColor = darkText;
    } else if (isDesigner(person)) {
      backgroundColor = designColor;
      fontColor = darkText;
    } else if (isEngagementMgr(person)) {
      backgroundColor = engagementColor;
    }
  }

  return { backgroundColor, fontColor };
};

const level0Group = (id, title, children, opts = {}) => {
  return {
    id: id,
    title: title,
    height: 50,
    root: true,
    parent: null,
    backgroundColor: projectColor,
    fontColor: lightText,
    startDate: new Date(Math.min(...children.map((p) => p.startDate))),
    endDate: new Date(Math.max(...children.map((p) => p.endDate))),
    treeLevel: 0,
    type: "scenario",
    ...opts,
  };
};

const level1Group = (id, title, parent, startDate, endDate, opts = {}) => {
  return {
    id: id,
    title: title,
    height: 50,
    root: true,
    parent: parent,
    startDate: startDate,
    endDate: endDate,
    backgroundColor: projectColor,
    fontColor: lightText,
    treeLevel: 1,
    type: "project",
    ...opts,
  };
};

const level2Group = (id, title, parent, startDate, endDate, opts = {}) => {
  return {
    id: id,
    title: title,
    root: false,
    parent: parent,
    startDate: startDate,
    endDate: endDate,
    treeLevel: 2,
    height: 50,
    type: "person",
    ...opts,
  };
};

const TimelineGrouper = (scenarios, people, timelineStart, timelineEnd) => {
  let timelineGroups = [];

  timelineGroups.push(level0Group("NewScenario", "New Scenario", [], { root: false, addable: true }));

  return scenarios.reduce((groups, scenario) => {
    const level0Id = scenario.id;
    groups.push(level0Group(level0Id, scenario.title, scenario.projects));
    if (!scenario.current) {
      groups.push(
        level1Group(`NewProject-${level0Id}`, "New Project", level0Id, null, null, {
          root: false,
          addable: true,
        })
      );
    }

    scenario.projects.forEach((project) => {
      const level1Id = `${scenario.id}-${project.id}`;
      groups.push(
        level1Group(level1Id, project.name, level0Id, project.startDate, project.endDate, {
          editable: project.editable,
        })
      );
      if (!scenario.current) {
        groups.push(
          level2Group(`NewPerson-${level1Id}`, "New Person", level1Id, null, null, {
            addable: true,
          })
        );
      }

      project.people.forEach((person) => {
        const level2Id = `${scenario.id}-${project.id}-${person.id}`;
        let projectPerson = groups.find((g) => g.id === level2Id);

        if (!projectPerson) {
          groups.push(
            level2Group(
              level2Id,
              displayName(person),
              level1Id,
              person.assignment.startDate,
              person.assignment.endDate,
              {
                ...itemStylesForPerson(person),
                assignment: person.assignment,
                moveable: project.editable,
                resizeable: project.editable,
                editable: person.editable,
              }
            )
          );
        } else {
          const earlierStartDateExists = person.assignment.startDate < projectPerson.startDate;
          projectPerson.startDate = earlierStartDateExists ? person.assignment.startDate : projectPerson.startDate;

          const laterStartDateExists = person.assignment.endDate > projectPerson.endDate;
          projectPerson.endDate = laterStartDateExists ? person.assignment.endDate : projectPerson.endDate;
        }
      });
    });

    const allAssignedPeople = scenario.projects.flatMap((project) => project.people);
    const benchPeople = [...people.map((p) => ({ ...p, endDate: timelineStart }))];
    allAssignedPeople
      .map((p) => p.assignment)
      .forEach((a) => {
        const matchingPerson = benchPeople.find((p) => p.id === a.personId);
        if (!!matchingPerson && matchingPerson.endDate < a.endDate) {
          matchingPerson.endDate = a.endDate;
        }
      });

    // create a bench project for all the people
    const benchProjectId = `Bench-${scenario.id}`;
    const benchStartDate = new Date(Math.min(...benchPeople.map((p) => p.endDate)));
    groups.push(
      level1Group(benchProjectId, "Bench", level0Id, benchStartDate, timelineEnd, {
        backgroundColor: benchColor,
        fontColor: darkText,
      })
    );

    // sort bench people groups by bench date, then by department
    let sorted = benchPeopleSort(benchPeople);

    sorted.forEach((person) => {
      groups.push(
        level2Group(
          `Bench-${scenario.id}-${person.id}`,
          displayName(person),
          benchProjectId,
          person.endDate,
          timelineEnd,
          {
            ...itemStylesForPerson(person),
          }
        )
      );
    });

    return groups;
  }, timelineGroups);
};

export default TimelineGrouper;
