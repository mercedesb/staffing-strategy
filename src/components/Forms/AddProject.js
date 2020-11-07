import React from "react";

import { ProjectsContext } from "contexts";
import { useAirtable } from "hooks";

import { ProjectForm } from "./ProjectForm";

export function AddProject({ scenarioId }) {
  const { fetchProjects } = React.useContext(ProjectsContext);

  const { createProject } = useAirtable();

  const handleSubmit = async (data) => {
    await createProject(data);
    fetchProjects();
  };

  return <ProjectForm title="Add new project" scenarioId={scenarioId} onSubmit={handleSubmit} />;
}
