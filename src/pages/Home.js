import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import { PeopleContext } from "contexts";
import { ScenariosTimeline } from "components";
import { useAirtable, useForecast, useLocalStorage, usePipedrive } from "hooks";

const ASSIGNMENTS_STORAGE_KEY = "assignments";
const DEALS_STORAGE_KEY = "deals";
const PROJECTS_STORAGE_KEY = "projects";

export default function Home() {
  const { allPeople, currentPeople, upcomingPeople } = React.useContext(PeopleContext);

  const { get, set } = useLocalStorage();
  const { getDeals } = usePipedrive();
  const { getAssignments: getForecastAssignments, getProjects } = useForecast();
  const { getAssignments: getAirtableAssignments, getScenarios } = useAirtable();

  const [assignments, setAssignments] = useState(get(ASSIGNMENTS_STORAGE_KEY) || []);
  const [deals, setDeals] = useState(get(DEALS_STORAGE_KEY) || []);
  const [projects, setProjects] = useState(get(PROJECTS_STORAGE_KEY) || []);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [upcomingScenarios, setUpcomingScenarios] = useState([]);

  useEffect(() => {
    (async function () {
      if (!assignments || assignments.length === 0) {
        const allAssignments = await getForecastAssignments();
        const parsedAssignments = allAssignments
          .filter((a) => !!a.id)
          .filter((a) => !!a.project_id)
          .filter((a) => !!a.person_id)
          .map((a) => ({
            ...a,
            id: a.id.toString(),
            projectId: a.project_id.toString(),
            personId: a.person_id.toString(),
            startDate: a.start_date.toString(),
            endDate: a.end_date.toString(),
          }));
        setAssignments(parsedAssignments);
        set(ASSIGNMENTS_STORAGE_KEY, parsedAssignments);
      }

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

      if (!upcomingAssignments || upcomingAssignments.length === 0) {
        const allUpcomingAssignments = await getAirtableAssignments();
        const parsedUpcomingAssignments = allUpcomingAssignments
          .filter((a) => !!a.id)
          .filter((a) => !!a.projectId)
          .filter((a) => !!a.personId)
          .map((a) => ({
            ...a,
            id: a.id.toString(),
            projectId: a.projectId.toString(),
            personId: a.personId.toString(),
            scenarioId: a.scenarioId[0],
          }));
        setUpcomingAssignments(parsedUpcomingAssignments);
      }

      if (!upcomingScenarios || upcomingScenarios.length === 0) {
        const allUpcomingScenarios = await getScenarios();
        setUpcomingScenarios(allUpcomingScenarios);
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  let currentScenarios = ScenarioParser([{ id: 0, name: "Current" }], assignments, currentPeople, projects, []);
  let possibleScenarios = ScenarioParser(
    upcomingScenarios,
    [...assignments, ...upcomingAssignments],
    [...currentPeople, ...upcomingPeople],
    projects,
    deals
  );
  return <ScenariosTimeline events={[...currentScenarios, ...possibleScenarios]} people={[allPeople]} />;
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

        const projectStart = new Date(Math.min(...projectAssignments.map((p) => dayjs(p.startDate).toDate())));
        const projectEnd = new Date(Math.max(...projectAssignments.map((p) => dayjs(p.endDate).toDate())));

        const staffedPeople = projectAssignments.map((a) => {
          let person = people.find((p) => a.personId === p.id);
          return {
            ...person,
            firstName: person.firstName,
            lastName: person.lastName,
            assignment: {
              ...a,
              startDate: dayjs(a.startDate).toDate(),
              endDate: dayjs(a.endDate).toDate(),
            },
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
