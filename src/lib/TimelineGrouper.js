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
  if (person.roles.includes("Development")) {
    backgroundColor = engineeringColor;
    fontColor = darkText;
  } else if (person.roles.includes("Design")) {
    backgroundColor = designColor;
    fontColor = darkText;
  } else if (person.roles.includes("Growth")) {
    backgroundColor = engagementColor;
  }

  return { backgroundColor, fontColor };
};

const level0Group = (id, title, children) => {
  return {
    id: id,
    title: title,
    rightTitle: title,
    height: 50,
    root: true,
    parent: null,
    backgroundColor: projectColor,
    fontColor: lightText,
    startDate: new Date(Math.min(...children.map((p) => p.startDate))),
    endDate: new Date(Math.max(...children.map((p) => p.endDate))),
    treeLevel: 0,
  };
};

const level1Group = (id, title, parent, startDate, endDate, opts = {}) => {
  return {
    id: id,
    title: title,
    rightTitle: title,
    height: 50,
    root: true,
    parent: parent,
    startDate: startDate,
    endDate: endDate,
    backgroundColor: projectColor,
    fontColor: lightText,
    treeLevel: 1,
    ...opts,
  };
};

const level2Group = (id, title, parent, startDate, endDate, opts = {}) => {
  return {
    id: id,
    title: title,
    rightTitle: title,
    root: false,
    parent: parent,
    startDate: startDate,
    endDate: endDate,
    treeLevel: 2,
    ...opts,
  };
};

const TimelineGrouper = (scenarios, timelineEnd) => {
  return scenarios.reduce((groups, scenario) => {
    const level0Id = scenario.id;
    groups.push(level0Group(level0Id, scenario.title, scenario.projects));

    scenario.projects.forEach((project) => {
      const level1Id = `${scenario.id}-${project.id}`;
      groups.push(level1Group(level1Id, project.name, level0Id, project.startDate, project.endDate));

      project.people.forEach((person) => {
        const level2Id = `${scenario.id}-${project.id}-${person.id}`;
        let projectPerson = groups.find((g) => g.id === level2Id);
        if (!projectPerson) {
          groups.push(
            level2Group(
              level2Id,
              `${person.firstName} ${person.lastName[0]}.`,
              level1Id,
              person.assignment.startDate,
              person.assignment.endDate,
              itemStylesForPerson(person)
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

    // TODO: will this work for someone who currently isn't staffed??
    // get the person groups found in this scenario
    let projectPeopleGroups = groups.filter(
      (g) => g.treeLevel === 2 && scenario.projects.map((p) => `${scenario.id}-${p.id}`).includes(g.parent)
    );

    // create a bench project for all the people
    const benchProjectId = `Bench-${scenario.id}`;
    const benchStartDate = new Date(Math.min(...projectPeopleGroups.map((p) => p.endDate)));
    groups.push(
      level1Group(benchProjectId, "Bench", level0Id, benchStartDate, timelineEnd, {
        backgroundColor: benchColor,
        fontColor: darkText,
      })
    );

    projectPeopleGroups.forEach((g) => {
      groups.push(
        level2Group(`Bench-${g.id}`, g.title, benchProjectId, g.endDate, timelineEnd, {
          backgroundColor: g.backgroundColor,
          fontColor: g.fontColor,
        })
      );
    });

    return groups;
  }, []);
};

export default TimelineGrouper;
