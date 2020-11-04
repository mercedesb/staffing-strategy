import React from "react";
import { Box } from "grommet";

import { AssignmentsContext, PeopleContext, ProjectsContext, ScenariosContext } from "contexts";
import { ScenariosTimeline } from "components";
import { ScenarioParser } from "lib";

export default function Home() {
  const { allAssignments, currentAssignments } = React.useContext(AssignmentsContext);
  const { allPeople, billablePeople } = React.useContext(PeopleContext);
  const { allProjects, currentProjects } = React.useContext(ProjectsContext);
  const { currentScenarios, upcomingScenarios } = React.useContext(ScenariosContext);

  let nowScenarios = ScenarioParser(currentScenarios, currentAssignments, billablePeople, currentProjects);
  let possibleScenarios = ScenarioParser(upcomingScenarios, allAssignments, allPeople, allProjects);
  return (
    <>
      <Box pad={{ bottom: "medium" }}>
        <h1>Staffing Planning</h1>
      </Box>
      <ScenariosTimeline events={[...nowScenarios, ...possibleScenarios]} people={billablePeople} />
    </>
  );
}
