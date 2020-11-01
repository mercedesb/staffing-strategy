import React, { useState, useEffect } from "react";

import { AssignmentsContext, PeopleContext, ScenariosContext } from "contexts";
import { ScenariosTimeline } from "components";
import { useForecast, useLocalStorage, usePipedrive } from "hooks";
import { ScenarioParser } from "lib";

const DEALS_STORAGE_KEY = "deals";
const PROJECTS_STORAGE_KEY = "projects";

export default function Home() {
  const { allPeople, currentPeople } = React.useContext(PeopleContext);
  const { allAssignments, currentAssignments } = React.useContext(AssignmentsContext);
  const { currentScenarios, upcomingScenarios } = React.useContext(ScenariosContext);

  const { get, set } = useLocalStorage();
  const { getDeals } = usePipedrive();
  const { getProjects } = useForecast();

  const [deals, setDeals] = useState(get(DEALS_STORAGE_KEY) || []);
  const [projects, setProjects] = useState(get(PROJECTS_STORAGE_KEY) || []);

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

      if (!projects || projects.length === 0) {
        const allProjects = await getProjects();
        const parsedProjects = allProjects
          .filter((p) => !!p.id)
          .map((p) => ({
            ...p,
            id: p.id.toString(),
            name: `${p.code} - ${p.name}`,
          }));
        setProjects(parsedProjects);
        set(PROJECTS_STORAGE_KEY, parsedProjects);
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  let nowScenarios = ScenarioParser(currentScenarios, currentAssignments, currentPeople, projects, []);
  let possibleScenarios = ScenarioParser(upcomingScenarios, allAssignments, allPeople, projects, deals);
  return <ScenariosTimeline events={[...nowScenarios, ...possibleScenarios]} people={[allPeople]} />;
}
