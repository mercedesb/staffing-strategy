import React, { useState, useEffect } from "react";
import { IconPlus, IconClick } from "tabler-icons";

import { ProjectsContext } from "contexts";
import { useAirtable } from "hooks";

import { ButtonWithIcon } from "components";
import { ChooseProject } from "./ChooseProject";
import { ProjectForm } from "./ProjectForm";

export function AddProject({ scenarioId, closeModal, initialFocusRef }) {
  const { upcomingProjects, fetchProjects } = React.useContext(ProjectsContext);

  const { createProject, updateProject } = useAirtable();

  const nonScenarioProjects = upcomingProjects.filter((p) => !p.scenarios.includes(scenarioId));

  const [addNew, setAddNew] = useState(nonScenarioProjects.length === 0);

  useEffect(() => {
    initialFocusRef.current.focus();
  }, [addNew, initialFocusRef]);

  const handleAddNew = async (data) => {
    await createProject({ ...data, scenarios: [scenarioId] });
    fetchProjects();
  };

  const handleAddExisting = async (projectToAddToScenario) => {
    await updateProject(projectToAddToScenario, {
      ...projectToAddToScenario,
      scenarios: [...projectToAddToScenario.scenarios, scenarioId],
    });
    fetchProjects();
  };

  const handleCancel = () => {
    setAddNew(false);
    closeModal();
  };

  return (
    <>
      {addNew ? (
        <ProjectForm
          title="Add new project"
          onSubmit={handleAddNew}
          onCancel={handleCancel}
          initialFocusRef={initialFocusRef}
        />
      ) : (
        <ChooseProject
          projects={nonScenarioProjects}
          onSubmit={handleAddExisting}
          onCancel={handleCancel}
          initialFocusRef={initialFocusRef}
        />
      )}
      <div className="w-full flex justify-end mt-8">
        <ButtonWithIcon onClick={() => setAddNew(!addNew)} className="noBtn text-growingGreen w-auto">
          {addNew ? (
            <>
              <IconClick /> Choose existing project
            </>
          ) : (
            <>
              <IconPlus /> Create new project
            </>
          )}
        </ButtonWithIcon>
      </div>
    </>
  );
}
