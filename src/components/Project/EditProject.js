import React from "react";
import { IconTrash } from "tabler-icons";

import { ProjectsContext } from "contexts";
import { useServer } from "hooks";

import { ButtonWithIcon } from "components";
import { ProjectForm } from "./ProjectForm";

export function EditProject({ project, scenarioId, deletable, closeModal, initialFocusRef }) {
  const { fetchProjects } = React.useContext(ProjectsContext);

  const { updateProject, deleteProject } = useServer();

  const handleSubmit = async (data) => {
    await updateProject(project.id, { ...project, ...data });
    fetchProjects();
  };

  const handleDelete = async () => {
    if (project.scenarios.length > 1) {
      await updateProject(project.id, { ...project, scenarios: project.scenarios.filter((s) => s !== scenarioId) });
    } else {
      await deleteProject(project.id);
    }
    fetchProjects();
  };

  return (
    <>
      <ProjectForm
        title={`Edit ${project.name}`}
        project={project}
        onSubmit={handleSubmit}
        onCancel={closeModal}
        initialFocusRef={initialFocusRef}
      />

      <div className="w-full flex justify-end mt-8">
        <ButtonWithIcon onClick={handleDelete} className="noBtn text-ripenedRed w-auto">
          <IconTrash />
          {deletable ? "Delete project" : "Remove project from scenario"}
        </ButtonWithIcon>
      </div>
    </>
  );
}
