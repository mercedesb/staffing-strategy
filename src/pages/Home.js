import React from "react";

import { AssignmentsContext, PeopleContext, ProjectsContext, ScenariosContext } from "contexts";
import { ScenariosTimeline } from "components";
import { ScenarioParser } from "lib";

export default function Home() {
  const { allAssignments, currentAssignments } = React.useContext(AssignmentsContext);
  const { allPeople, billablePeople } = React.useContext(PeopleContext);
  const { allProjects, currentProjects } = React.useContext(ProjectsContext);
  const { currentScenarios, upcomingScenarios } = React.useContext(ScenariosContext);

  const header = <h1 className="mb-4">Staffing Planning</h1>;

  const dataLoaded =
    currentScenarios.length > 0 &&
    currentAssignments.length > 0 &&
    billablePeople.length > 0 &&
    currentProjects.length > 0;

  if (dataLoaded) {
    let nowScenarios = ScenarioParser(currentScenarios, currentAssignments, billablePeople, currentProjects);
    let possibleScenarios = ScenarioParser(upcomingScenarios, allAssignments, allPeople, allProjects);
    return (
      <>
        {header}
        <ScenariosTimeline events={[...nowScenarios, ...possibleScenarios]} people={billablePeople} />
      </>
    );
  } else {
    return header;
  }
}
