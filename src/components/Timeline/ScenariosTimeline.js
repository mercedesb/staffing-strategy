import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Timeline from "react-calendar-timeline";
import containerResizeDetector from "react-calendar-timeline/lib/resize-detector/container";

import "react-calendar-timeline/lib/Timeline.css";
import "./ScenariosTimeline.css";

import { TimelineGrouper } from "lib";
import { TimelineGroup } from "./TimelineGroup";

const start = dayjs().startOf("day").toDate();
const end = dayjs().startOf("day").add(6, "months").toDate();

export const ScenariosTimeline = ({ events, people }) => {
  const [allGroups, setAllGroups] = useState([]);
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    let groups = TimelineGrouper(events, people, start, end);
    setAllGroups(groups);
  }, [events, people]);

  let items = allGroups.map((g) => {
    return {
      id: g.id,
      group: g.id,
      title: g.title,
      start_time: g.startDate.getTime(),
      end_time: g.endDate.getTime(),
      canMove: true,
      canResize: true,
      canChangeGroup: true,
      itemProps: {
        className: g.treeLevel === 0 || g.treeLevel === 1 ? `staffing-item-lg` : `staffing-item`,
        style: {
          borderColor: g.backgroundColor,
          backgroundColor: g.backgroundColor,
          color: g.fontColor,
          fontSize: "1rem",
        },
      },
    };
  });

  const toggleGroup = (id) => {
    setOpenGroups({
      ...openGroups,
      [id]: !openGroups[id],
    });
  };

  const groupsToDisplay = allGroups.filter((g) => g.treeLevel === 0 || openGroups[g.parent]);

  return (
    <div className="CalendarContainer">
      <Timeline
        groups={groupsToDisplay}
        items={items}
        defaultTimeStart={start}
        defaultTimeEnd={end}
        stackItems
        sidebarWidth={225}
        canSelect={false}
        showCursorLine
        groupRenderer={(group) => (
          <TimelineGroup timelineGroup={group} openGroups={openGroups} toggleGroup={toggleGroup} />
        )}
        resizeDetector={containerResizeDetector}
      />
    </div>
  );
};
