import React from "react";

import { AssignmentsContext, DealsContext, PeopleContext, ProjectsContext, ScenariosContext } from "contexts";
import { ScenariosTimeline } from "components";
import { ScenarioParser } from "lib";

export default function Home() {
  const { allAssignments, currentAssignments } = React.useContext(AssignmentsContext);
  const { deals } = React.useContext(DealsContext);
  const { allPeople, currentPeople } = React.useContext(PeopleContext);
  const { currentProjects } = React.useContext(ProjectsContext);
  const { currentScenarios, upcomingScenarios } = React.useContext(ScenariosContext);

  let nowScenarios = ScenarioParser(currentScenarios, currentAssignments, currentPeople, currentProjects, []);
  let possibleScenarios = ScenarioParser(upcomingScenarios, allAssignments, allPeople, currentProjects, deals);
  return <ScenariosTimeline events={[...nowScenarios, ...possibleScenarios]} people={[allPeople]} />;
}
