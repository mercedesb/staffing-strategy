import React from "react";
import { IconTrash } from "tabler-icons";

import { ProjectsContext } from "contexts";
import { useAirtable } from "hooks";

import { ButtonWithIcon } from "components";
import { ProjectForm } from "./ProjectForm";

export function EditProject({ project, deletable, closeModal }) {
  const { fetchProjects } = React.useContext(ProjectsContext);

  const { updateProject, deleteProject } = useAirtable();

  const handleSubmit = async (data) => {
    await updateProject(project.id, { ...project, ...data });
    fetchProjects();
  };

  const handleDelete = async () => {
    await deleteProject(project.id);
    fetchProjects();
  };

  return (
    <>
      <ProjectForm title={`Edit ${project.name}`} project={project} onSubmit={handleSubmit} onCancel={closeModal} />
      {deletable && (
        <div className="w-full flex justify-end mt-8">
          <ButtonWithIcon onClick={handleDelete} className="noBtn text-ripenedRed w-auto">
            <IconTrash /> Delete project
          </ButtonWithIcon>
        </div>
      )}
    </>
  );
}