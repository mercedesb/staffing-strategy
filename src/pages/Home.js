import React from "react";

import { AssignmentsContext, PeopleContext, ProjectsContext, ScenariosContext } from "contexts";
import { ScenariosTimeline } from "components";
import { ScenarioParser } from "lib";

export default function Home() {
  const { allAssignments, currentAssignments } = React.useContext(AssignmentsContext);
  const { allPeople, currentPeople } = React.useContext(PeopleContext);
  const { allProjects, currentProjects } = React.useContext(ProjectsContext);
  const { currentScenarios, upcomingScenarios } = React.useContext(ScenariosContext);

  let nowScenarios = ScenarioParser(currentScenarios, currentAssignments, currentPeople, currentProjects);
  let possibleScenarios = ScenarioParser(upcomingScenarios, allAssignments, allPeople, allProjects);
  return <ScenariosTimeline events={[...nowScenarios, ...possibleScenarios]} people={[allPeople]} />;
}
