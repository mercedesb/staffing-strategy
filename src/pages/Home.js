import React, { useState, useEffect } from "react";

import { AssignmentsContext, PeopleContext, ScenariosContext } from "contexts";
import { ScenariosTimeline } from "components";
import { useForecast, useLocalStorage, usePipedrive } from "hooks";

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

const ScenarioParser = (scenarios, assignments, people, projects, deals) => {
  let projectIds = [...new Set(assignments.map((a) => a.projectId))];
  let parsedProjects = projectIds.map((id) => projects.find((p) => p.id === id)).filter((p) => !!p);
  let parsedDeals = projectIds.map((id) => deals.find((d) => d.id === id)).filter((d) => !!d);
  return scenarios.map((scenario) => {
    let staffedDeals = parsedDeals.filter((p) =>
      assignments.find((a) => a.scenarioId === scenario.id && a.projectId === p.id)
    );
    let staffedProjects = [...parsedProjects, ...staffedDeals];

    return {
      id: scenario.id,
      title: scenario.name,
      projects: staffedProjects.map((project) => {
        const projectAssignments = assignments.filter((a) => {
          let bool = a.projectId === project.id;
          if (!!a.scenarioId) {
            bool = bool && a.scenarioId === scenario.id;
          }
          return bool;
        });

        const projectStart = new Date(Math.min(...projectAssignments.map((p) => p.startDate)));
        const projectEnd = new Date(Math.max(...projectAssignments.map((p) => p.endDate)));

        const staffedPeople = projectAssignments.map((a) => {
          let person = people.find((p) => a.personId === p.id);
          return {
            ...person,
            assignment: { ...a },
          };
        });

        return {
          id: project.id,
          name: project.name,
          startDate: projectStart,
          endDate: projectEnd,
          people: staffedPeople,
        };
      }),
    };
  });
};
