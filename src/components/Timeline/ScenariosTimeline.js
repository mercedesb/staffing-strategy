import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Timeline from "react-calendar-timeline";
import containerResizeDetector from "react-calendar-timeline/lib/resize-detector/container";

import "react-calendar-timeline/lib/Timeline.css";
import "./ScenariosTimeline.css";

import { AssignmentsContext } from "contexts";
import { useServer } from "hooks";
import { TimelineGrouper } from "lib";
import { TimelineGroup } from "./TimelineGroup";
import { TimelineItem } from "./TimelineItem";

const start = dayjs().startOf("day").toDate();
const end = dayjs().startOf("day").add(6, "months").toDate();

export const ScenariosTimeline = ({ events, people }) => {
  const { fetchAssignments } = React.useContext(AssignmentsContext);
  const { updateAssignment } = useServer();

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
      start_time: g.addable ? null : g.startDate.getTime(),
      end_time: g.addable ? null : g.endDate.getTime(),
      canSelect: !!g.moveable,
      canMove: !!g.moveable,
      canResize: !!g.resizeable,
      assignment: g.assignment,
      itemProps: {
        className: g.treeLevel === 0 || g.treeLevel === 1 ? `staffing-item-lg` : `staffing-item`,
        style: {
          border: g.backgroundColor || "#000",
          background: g.backgroundColor,
          color: g.fontColor,
          fontSize: "1rem",
        },
      },
    };
  });

  const toggleGroup = (id, group) => {
    const newOpenGroupsState = { ...openGroups };
    newOpenGroupsState[id] = !openGroups[id];

    const splitId = id.split("-");
    const scenarioId = splitId[0];

    // is collapsing if it's currently open
    const collapsing = openGroups[id];

    // collapse children if collapsing parent
    if (collapsing) {
      Object.keys(newOpenGroupsState).forEach((key) => {
        if (group.type === "scenario" && key.includes(scenarioId) && openGroups[key]) {
          newOpenGroupsState[key] = !openGroups[key];
        }
      });
    }

    setOpenGroups(newOpenGroupsState);
  };

  const handleItemMove = async (itemId, dragTime, _newGroupOrder) => {
    const item = items.find((i) => i.id === itemId);
    const assignment = item.assignment;

    const startDay = dayjs(assignment.startDate);
    const endDay = dayjs(assignment.endDate);
    const diff = endDay.diff(startDay);

    let newStartDate = dayjs(dragTime); // TODO: is this a unix timestamp? can we initialize it this way?
    let newEndDate = newStartDate.add(diff, "ms");
    let data = {
      ...assignment,
      startDate: newStartDate,
      endDate: newEndDate,
    };
    await updateAssignment(assignment.id, data);
    fetchAssignments();
  };

  const handleItemResize = async (itemId, time, edge) => {
    const item = items.find((i) => i.id === itemId);
    const assignment = item.assignment;

    let newStartDate = dayjs(item.start_time);
    let newEndDate = dayjs(item.end_time);

    if (edge === "left") {
      newStartDate = dayjs(time);
    } else {
      newEndDate = dayjs(time);
    }

    let data = { ...assignment, startDate: newStartDate, endDate: newEndDate };
    await updateAssignment(assignment.id, data);
    fetchAssignments();
  };

  const groupsToDisplay = allGroups.filter((g) => g.treeLevel === 0 || openGroups[g.parent]);

  return (
    <Timeline
      groups={groupsToDisplay}
      items={items}
      defaultTimeStart={start}
      defaultTimeEnd={end}
      stackItems
      sidebarWidth={225}
      showCursorLine
      canMove
      canResize="both"
      canChangeGroup={false}
      useResizeHandle={true}
      onItemMove={handleItemMove}
      onItemResize={handleItemResize}
      itemRenderer={(context) => {
        return (
          <TimelineItem
            item={context.item}
            itemContext={context.itemContext}
            getItemProps={context.getItemProps}
            getResizeProps={context.getResizeProps}
          />
        );
      }}
      groupRenderer={(context) => (
        <TimelineGroup group={context.group} openGroups={openGroups} toggleGroup={toggleGroup} />
      )}
      resizeDetector={containerResizeDetector}
    />
  );
};
