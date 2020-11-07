import React from "react";

import { ProjectsContext } from "contexts";
import { useAirtable } from "hooks";

import { ProjectForm } from "./ProjectForm";

export function EditProject({ project, scenarioId, deletable }) {
  const { fetchProjects } = React.useContext(ProjectsContext);

  const { updateProject } = useAirtable();

  const handleSubmit = async (data) => {
    await updateProject(data);
    fetchProjects();
  };

  return (
    <ProjectForm title={`Edit ${project.name}`} project={project} scenarioId={scenarioId} onSubmit={handleSubmit} />
  );
}
