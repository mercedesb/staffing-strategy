import React, { useState } from "react";
import Select from "react-select";

import { FormButtonContainer } from "components";
import { ProjectsContext } from "contexts";

export function ChooseProject({ projects, onSubmit, onCancel, initialFocusRef }) {
  const { upcomingProjects } = React.useContext(ProjectsContext);

  const [project, setProject] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectToAddToScenario = upcomingProjects.find((p) => p.id === project.value);
    onSubmit(projectToAddToScenario);
  };

  return (
    <>
      <h2 className="pb-8">Choose project</h2>
      <form onSubmit={handleSubmit}>
        <Select
          options={projects
            .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
            .map((p) => ({ label: p.name, value: p.id }))}
          onChange={(selectedOption) => setProject(selectedOption)}
          ref={initialFocusRef}
          className="mb-4"
        />
        <FormButtonContainer onCancel={onCancel} />
      </form>
    </>
  );
}
