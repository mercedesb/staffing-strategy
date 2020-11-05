import React, { useState } from "react";
import dayjs from "dayjs";

import { IconChevronDown, IconChevronUp, IconPlus } from "tabler-icons";

import { AssignmentsContext, PeopleContext, ProjectsContext, ScenariosContext } from "contexts";
import { useAirtable } from "hooks";
import { ButtonWithIcon } from "components";
import { displayName } from "lib";

export function TimelineGroup({ group, openGroups, toggleGroup }) {
  const { fetchAssignments } = React.useContext(AssignmentsContext);
  const { allPeople, fetchPeople } = React.useContext(PeopleContext);
  const { fetchProjects } = React.useContext(ProjectsContext);
  const { fetchScenarios } = React.useContext(ScenariosContext);

  const { createAssignment, createPerson, createProject, createScenario } = useAirtable();

  const [showInput, setShowInput] = useState(false);
  const [newGroup, setNewGroup] = useState("");

  const handleAdd = async () => {
    let data;
    switch (group.addable) {
      case "scenario":
        data = { name: newGroup };
        await createScenario(data);
        fetchScenarios();
        break;
      case "project":
        data = { name: newGroup, startDate: dayjs(), endDate: dayjs().add(1, "month") };
        await createProject(data);
        fetchProjects();
        break;
      case "person":
        // if person already exists (check by name), create assignment
        debugger;
        const existingPerson = allPeople.find((p) => displayName(p) === newGroup);
        if (!!existingPerson) {
          data = {
            scenarioId: [group.id.split("-")[1]],
            projectId: group.id.split("-")[2],
            personId: existingPerson.id,
            startDate: dayjs(),
            endDate: dayjs().add(1, "month"),
          };
        } else {
          let personData = {
            firstName: newGroup,
          };
          let createdPerson = await createPerson(personData);
          data = {
            scenarioId: [group.id.split("-")[1]],
            projectId: group.id.split("-")[2],
            personId: createdPerson.id,
            startDate: dayjs(),
            endDate: dayjs().add(1, "month"),
          };
          fetchPeople();
        }
        await createAssignment(data);
        fetchAssignments();
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (e) => {
    // We pass the new value of the text when calling onAccept
    if (e.key === "Enter") {
      handleAdd();
      setShowInput(false);
    }
  };

  const renderExpandableGroup = () => {
    return (
      <ButtonWithIcon onClick={() => toggleGroup(group.id)} className="noBtn">
        {openGroups[group.id] ? <IconChevronUp /> : <IconChevronDown />} {group.title}
      </ButtonWithIcon>
    );
  };

  const renderAddableGroup = () => {
    if (showInput) {
      return (
        <input
          type="text"
          className="border border-blue-500 leading-4 p-2 w-full"
          onChange={(e) => setNewGroup(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
      );
    } else {
      return (
        <ButtonWithIcon onClick={() => setShowInput(true)} className="noBtn ml-4">
          <IconPlus /> {group.title}
        </ButtonWithIcon>
      );
    }
  };

  let className = "";
  if (group.treeLevel === 1) className += "ml-4";
  else if (group.treeLevel === 2) className += "ml-8";

  if (group.root) {
    return <div className={className}>{renderExpandableGroup()}</div>;
  } else if (group.addable) {
    return <div className={className}>{renderAddableGroup()}</div>;
  } else {
    return <div className={className}>{group.title}</div>;
  }
}
