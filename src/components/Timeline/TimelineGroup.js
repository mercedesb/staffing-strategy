import React from "react";

import { IconChevronDown, IconChevronUp, IconPlus } from "tabler-icons";

import { AssignmentsContext, ProjectsContext, ScenariosContext } from "contexts";
import { useAirtable } from "hooks";
import { ButtonWithIcon, Modal } from "components";
import { AddScenarioForm } from "./AddScenarioForm";
import { AddProjectForm } from "./AddProjectForm";
import { AddPersonForm } from "./AddPersonForm";

export function TimelineGroup({ group, openGroups, toggleGroup }) {
  const { fetchAssignments } = React.useContext(AssignmentsContext);
  const { fetchProjects } = React.useContext(ProjectsContext);
  const { fetchScenarios } = React.useContext(ScenariosContext);

  const { createAssignment, createProject, createScenario } = useAirtable();

  const handleAddScenario = async (data) => {
    await createScenario(data);
    fetchScenarios();
  };

  const handleAddProject = async (data) => {
    await createProject(data);
    fetchProjects();
  };

  const handleAddPerson = async (data) => {
    await createAssignment(data);
    fetchAssignments();
  };

  const renderExpandableGroup = () => {
    return (
      <ButtonWithIcon onClick={() => toggleGroup(group.id)} className="noBtn">
        {openGroups[group.id] ? <IconChevronUp /> : <IconChevronDown />} {group.title}
      </ButtonWithIcon>
    );
  };

  const renderForm = () => {
    switch (group.type) {
      case "scenario":
        return <AddScenarioForm onSubmit={handleAddScenario} />;
      case "project":
        return <AddProjectForm onSubmit={handleAddProject} />;
      case "person":
        return <AddPersonForm onSubmit={handleAddPerson} />;
      default:
        return null;
    }
  };

  const renderAddableGroup = () => {
    return (
      <Modal
        linkText={
          <>
            <IconPlus /> {group.title}
          </>
        }
        modalLabel={`Add ${group.title}`}
      >
        {renderForm()}
      </Modal>
    );
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
