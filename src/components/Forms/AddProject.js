import React, { useState } from "react";
import Select from "react-select";

import { ProjectsContext } from "contexts";
import { useAirtable } from "hooks";

import { Button } from "components";
import { ProjectForm } from "./ProjectForm";

export function AddProject({ scenarioId, closeModal }) {
  const { upcomingProjects, fetchProjects } = React.useContext(ProjectsContext);

  const { createProject, updateProject } = useAirtable();

  const [addNew, setAddNew] = useState(false);
  const [project, setProject] = useState({});

  const handleAddNew = async (data) => {
    await createProject({ ...data, scenarios: [scenarioId] });
    fetchProjects();
  };

  const handleAddExisting = async (e) => {
    e.preventDefault();
    const projectToAddToScenario = upcomingProjects.find((p) => p.id === project.value);
    await updateProject(project.value, {
      ...projectToAddToScenario,
      scenarios: [...projectToAddToScenario.scenarios, scenarioId],
    });
    fetchProjects();
  };

  const handleCancel = () => {
    setAddNew(false);
    closeModal();
  };

  if (addNew) {
    return <ProjectForm title="Add new project" onSubmit={handleAddNew} onCancel={handleCancel} />;
  } else {
    return (
      <>
        <h2 className="pb-8">Choose project</h2>{" "}
        <form onSubmit={handleAddExisting}>
          <Select
            options={upcomingProjects
              .filter((p) => !p.scenarios.includes(scenarioId))
              .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
              .map((p) => ({ label: p.name, value: p.id }))}
            onChange={(selectedOption) => setProject(selectedOption)}
            className="mb-4"
          />
          <div className="pt-8">
            <Button primary type="submit">
              Save
            </Button>
            <Button secondary onClick={() => setAddNew(true)} className="ml-4">
              Create new project
            </Button>
          </div>
        </form>
      </>
    );
  }
}
