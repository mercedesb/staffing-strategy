import React, { useState, useEffect } from "react";

import { AssignmentsContext, PeopleContext, ProjectsContext, ScenariosContext } from "contexts";
import { ScenariosTimeline } from "components";
import { useLocalStorage, usePipedrive } from "hooks";
import { ScenarioParser } from "lib";

const DEALS_STORAGE_KEY = "deals";

export default function Home() {
  const { allAssignments, currentAssignments } = React.useContext(AssignmentsContext);
  const { allPeople, currentPeople } = React.useContext(PeopleContext);
  const { currentProjects } = React.useContext(ProjectsContext);
  const { currentScenarios, upcomingScenarios } = React.useContext(ScenariosContext);

  const { get, set } = useLocalStorage();
  const { getDeals } = usePipedrive();

  const [deals, setDeals] = useState(get(DEALS_STORAGE_KEY) || []);

  useEffect(() => {
    (async function () {
      if (!deals || deals.length === 0) {
        const dealsResponse = await getDeals();
        const parsedDeals = dealsResponse.data
          .filter((d) => !!d.id)
          .map((d) => ({
            ...d,
            id: d.id.toString(),
            name: d.title,
          }));
        setDeals(parsedDeals);
        set(DEALS_STORAGE_KEY, parsedDeals);
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  let nowScenarios = ScenarioParser(currentScenarios, currentAssignments, currentPeople, currentProjects, []);
  let possibleScenarios = ScenarioParser(upcomingScenarios, allAssignments, allPeople, currentProjects, deals);
  return <ScenariosTimeline events={[...nowScenarios, ...possibleScenarios]} people={[allPeople]} />;
}
