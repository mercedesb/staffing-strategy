import React, { useState } from "react";
import dayjs from "dayjs";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";

export const Calendar = ({ events }) => {
  const [openGroups, setOpenGroups] = useState({});

  const engineeringColor = "#869B8D";
  const designColor = "#FCD9D2";
  const engagementColor = "#717244";
  const projectColor = "#0B2D48";
  const benchColor = "#FF694E";

  const start = dayjs().startOf("day").toDate();
  const end = dayjs().startOf("day").add(6, "months").toDate();

  let groupedByProject = events.reduce((acc, assignment) => {
    if (dayjs(assignment.end_date).toDate() < start) return acc;

    let rootProject = acc[assignment.project.id];

    if (!rootProject) {
      acc[assignment.project.id] = {
        project: assignment.project,
        people: [],
        startDate: null,
        endDate: null,
      };
      rootProject = acc[assignment.project.id];
    }

    if (!rootProject.startDate || !rootProject.startDate > dayjs(assignment.start_date).toDate()) {
      rootProject.startDate = dayjs(assignment.start_date).toDate();
    }

    if (!rootProject.endDate || !rootProject.endDate < dayjs(assignment.end_date).toDate()) {
      rootProject.endDate = dayjs(assignment.end_date).toDate();
    }

    let projectPersonStart = dayjs(assignment.start_date).toDate();
    let projectPersonEnd = dayjs(assignment.end_date).toDate();
    let projectPerson = rootProject.people.find((p) => p.person.id === assignment.person.id);

    if (!rootProject.people.find((p) => p.person.id === assignment.person.id)) {
      rootProject.people.push({
        person: { ...assignment.person },
        project: { ...assignment.project },
        startDate: projectPersonStart,
        endDate: projectPersonEnd,
      });
    } else {
      projectPerson.startDate =
        projectPersonStart < projectPerson.startDate ? projectPersonStart : projectPerson.startDate;

      projectPerson.endDate = projectPersonEnd > projectPerson.endDate ? projectPersonEnd : projectPerson.endDate;
    }

    return acc;
  }, {});

  let groups = [];

  groups.push({
    id: 1,
    title: "Current",
    rightTitle: "Current",
    bgColor: projectColor,
    root: true,
    parent: null,
    startDate: new Date(Math.min(...Object.values(groupedByProject).map((p) => p.startDate))),
    endDate: new Date(Math.max(...Object.values(groupedByProject).map((p) => p.endDate))),
    treeLevel: 0,
  });

  Object.values(groupedByProject).forEach((rootGroup) => {
    groups.push({
      id: rootGroup.project.id,
      title: rootGroup.project.name,
      rightTitle: rootGroup.project.name,
      bgColor: projectColor,
      root: true,
      parent: 1,
      startDate: rootGroup.startDate,
      endDate: rootGroup.endDate,
      treeLevel: 1,
    });

    rootGroup.people.forEach((childGroup) => {
      let color = projectColor;
      if (childGroup.person.roles.includes("Development")) {
        color = engineeringColor;
      } else if (childGroup.person.roles.includes("Design")) {
        color = designColor;
      } else if (childGroup.person.roles.includes("Growth")) {
        color = engagementColor;
      }

      groups.push({
        id: `${rootGroup.project.id}-${childGroup.person.id}`,
        title: childGroup.person.first_name,
        rightTitle: childGroup.person.first_name,
        bgColor: color,
        root: false,
        parent: childGroup.project.id,
        startDate: dayjs(childGroup.startDate).toDate(),
        endDate: dayjs(childGroup.endDate).toDate(),
        treeLevel: 2,
      });
    });
  });

  let peopleGroups = groups.filter((g) => g.treeLevel === 2);

  let earliestBenchDate = new Date(Math.min(...peopleGroups.map((p) => p.endDate)));

  groups.push({
    id: "Bench",
    title: "Bench",
    rightTitle: "Bench",
    bgColor: benchColor,
    root: true,
    parent: 1,
    startDate: earliestBenchDate,
    endDate: end,
    treeLevel: 1,
  });

  peopleGroups.forEach((childGroup) => {
    groups.push({
      ...childGroup,
      id: `Bench-${childGroup.id}`,
      parent: "Bench",
      startDate: dayjs(childGroup.endDate).toDate(),
      endDate: end,
    });
  });

  let items = groups.map((g) => ({
    id: g.id,
    group: g.id,
    title: g.title,
    start_time: g.startDate,
    end_time: g.endDate,
    // canMove: startValue > new Date().getTime(),
    // canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
  }));

  const toggleGroup = (id) => {
    setOpenGroups({
      ...openGroups,
      [id]: !openGroups[id],
    });
  };

  const newGroups = groups
    .filter((g) => g.treeLevel === 0 || openGroups[g.parent])
    // .filter((g) => g.root || openGroups[g.parent]
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
        groups={newGroups}
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
