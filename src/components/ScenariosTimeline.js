import React, { useState } from "react";
import dayjs from "dayjs";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";

export const ScenariosTimeline = ({ events }) => {
  const [openGroups, setOpenGroups] = useState({});

  const engineeringColor = "#A3CCCD";
  const designColor = "#FFEAB1";
  const engagementColor = "#717244";
  const projectColor = "#0B2D48";
  const benchColor = "#FF694E";

  const darkText = "#000";
  const lightText = "#FFF";

  const start = dayjs().startOf("day").toDate();
  const end = dayjs().startOf("day").add(6, "months").toDate();

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

  let groupsFromScenarios = events.reduce((groups, scenario) => {
    groups.push({
      id: scenario.id,
      title: scenario.title,
      rightTitle: scenario,
      backgroundColor: projectColor,
      fontColor: lightText,
      root: true,
      parent: null,
      startDate: new Date(Math.min(...scenario.projects.map((p) => p.startDate))),
      endDate: new Date(Math.max(...scenario.projects.map((p) => p.endDate))),
      treeLevel: 0,
    });

    scenario.projects.forEach((project) => {
      groups.push({
        id: project.id,
        title: project.name,
        rightTitle: project.name,
        backgroundColor: projectColor,
        fontColor: lightText,
        root: true,
        parent: scenario.id,
        startDate: project.startDate,
        endDate: project.endDate,
        treeLevel: 1,
      });

      project.people.forEach((person) => {
        let projectPerson = groups.find((g) => g.id === `${project.id}-${person.id}`);
        if (!projectPerson) {
          groups.push({
            id: `${project.id}-${person.id}`,
            title: person.firstName,
            rightTitle: person.firstName,
            ...itemStylesForPerson(person),
            root: false,
            parent: project.id,
            startDate: person.assignment.startDate,
            endDate: person.assignment.endDate,
            treeLevel: 2,
          });
        } else {
          projectPerson.startDate =
            person.assignment.startDate < projectPerson.startDate
              ? person.assignment.startDate
              : projectPerson.startDate;

          projectPerson.endDate =
            person.assignment.endDate > projectPerson.endDate ? person.assignment.endDate : projectPerson.endDate;
        }
      });
    });

    let projectPeopleGroups = groups.filter(
      (g) => g.treeLevel === 2 && scenario.projects.map((p) => p.id).includes(g.parent)
    );

    groups.push({
      id: `${scenario.id}-Bench`,
      title: "Bench",
      rightTitle: "Bench",
      backgroundColor: benchColor,
      fontColor: darkText,
      root: true,
      parent: scenario.id,
      startDate: new Date(Math.min(...projectPeopleGroups.map((p) => p.endDate))),
      endDate: end,
      treeLevel: 1,
    });

    projectPeopleGroups.forEach((g) => {
      groups.push({
        ...g,
        id: `${scenario.id}-Bench-${g.id}`,
        parent: `${scenario.id}-Bench`,
        startDate: g.endDate,
        endDate: end,
      });
    });

    return groups;
  }, []);

  let items = groupsFromScenarios.map((g) => ({
    id: g.id,
    group: g.id,
    title: g.title,
    start_time: g.startDate,
    end_time: g.endDate,
    itemProps: {
      className: "staffing-item",
      style: {
        borderColor: g.backgroundColor,
        backgroundColor: g.backgroundColor,
        color: g.fontColor,
        fontSize: "1rem",
      },
    },
    // canMove: startValue > new Date().getTime(),
    // canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
  }));

  const toggleGroup = (id) => {
    setOpenGroups({
      ...openGroups,
      [id]: !openGroups[id],
    });
  };

  const groupsWithTitleButtons = groupsFromScenarios
    .filter((g) => g.treeLevel === 0 || openGroups[g.parent])
    .map((group) => {
      return Object.assign({}, group, {
        title: group.root ? (
          <button onClick={() => toggleGroup(group.id)} className="noBtn" style={{ paddingLeft: 20 * group.treeLevel }}>
            {openGroups[group.id] ? "[-]" : "[+]"} {group.title}
          </button>
        ) : (
          <div style={{ paddingLeft: 40 }}>{group.title}</div>
        ),
      });
    });

  return (
    <div className="CalendarContainer">
      <Timeline
        groups={groupsWithTitleButtons}
        items={items}
        defaultTimeStart={start}
        defaultTimeEnd={end}
        stackItems
        sidebarWidth={225}
        canSelect
        showCursorLine
      />
    </div>
  );
};
