import React from "react";

import { ProjectsContext } from "contexts";
import { useAirtable } from "hooks";

import { ProjectForm } from "./ProjectForm";

export function EditProject({ project, deletable }) {
  const { fetchProjects } = React.useContext(ProjectsContext);

  const { updateProject } = useAirtable();

  const handleSubmit = async (data) => {
    await updateProject(project.id, { ...project, ...data });
    fetchProjects();
  };

  return <ProjectForm title={`Edit ${project.name}`} project={project} onSubmit={handleSubmit} />;
}
