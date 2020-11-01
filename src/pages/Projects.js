import React from "react";

import { ProjectsContext } from "contexts";
import { ProjectList } from "components";

export default function Projects() {
  const { currentProjects } = React.useContext(ProjectsContext);

  return <ProjectList projects={currentProjects} />;
}
