import React from "react";

import { ProjectsContext } from "contexts";
import { ProjectList } from "components";

export default function Projects() {
  const { currentProjects, upcomingProjects } = React.useContext(ProjectsContext);

  return <ProjectList currentProjects={currentProjects} upcomingProjects={upcomingProjects} />;
}
