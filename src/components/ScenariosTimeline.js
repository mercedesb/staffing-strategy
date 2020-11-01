import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";

import { TimelineGrouper } from "lib";

const start = dayjs().startOf("day").toDate();
const end = dayjs().startOf("day").add(6, "months").toDate();

export const ScenariosTimeline = ({ events, people }) => {
  const [allGroups, setAllGroups] = useState([]);
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    let groups = TimelineGrouper(events, end);
    setAllGroups(groups);
  }, [events]);

  let items = allGroups.map((g) => ({
    id: g.id,
    group: g.id,
    title: g.title,
    start_time: g.startDate,
    end_time: g.endDate,
    itemProps: {
      className: g.treeLevel === 0 || g.treeLevel === 1 ? `staffing-item-lg` : `staffing-item`,
      style: {
        borderColor: g.backgroundColor,
        backgroundColor: g.backgroundColor,
        color: g.fontColor,
        fontSize: "1rem",
      },
    },
  }));

  const toggleGroup = (id) => {
    setOpenGroups({
      ...openGroups,
      [id]: !openGroups[id],
    });
  };

  const groupsToDisplay = allGroups.filter((g) => g.treeLevel === 0 || openGroups[g.parent]);

  // TODO: custom renderer? this is clunky
  const nestedGroups = groupsToDisplay.map((group) => {
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
        groups={nestedGroups}
        items={items}
        defaultTimeStart={start}
        defaultTimeEnd={end}
        stackItems
        sidebarWidth={225}
        canSelect={false}
        showCursorLine
      />
    </div>
  );
};
