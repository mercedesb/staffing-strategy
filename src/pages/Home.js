import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import { ScenariosTimeline } from "components";
import { useForecast, useLocalStorage } from "hooks";

const ASSIGNMENTS_STORAGE_KEY = "assignments";
const PEOPLE_STORAGE_KEY = "people";
const PROJECTS_STORAGE_KEY = "projects";

export default function Home() {
  const { get, set } = useLocalStorage();
  const { getAssignments, getPeople, getProjects } = useForecast();

  const [assignments, setAssignments] = useState(get(ASSIGNMENTS_STORAGE_KEY) || []);
  const [people, setPeople] = useState(get(PEOPLE_STORAGE_KEY) || []);
  const [projects, setProjects] = useState(get(PROJECTS_STORAGE_KEY) || []);

  useEffect(() => {
    (async function () {
      if (!assignments || assignments.length === 0) {
        const allAssignments = await getAssignments();
        setAssignments(allAssignments);
        set(ASSIGNMENTS_STORAGE_KEY, allAssignments);
      }

      if (!people || people.length === 0) {
        const allPeople = await getPeople();
        setPeople(allPeople);
        set(PEOPLE_STORAGE_KEY, allPeople);
      }

      if (!projects || projects.length === 0) {
        const allProjects = await getProjects();
        setProjects(allProjects);
        set(PROJECTS_STORAGE_KEY, allProjects);
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  let scenarios = [CurrentScenarioParser(assignments, people, projects)];

  return <ScenariosTimeline events={scenarios} />;
}

const CurrentScenarioParser = (assignments, people, projects) => {
  let staffedProjects = [...new Set(assignments.map((a) => a.project_id))].map((id) =>
    projects.find((p) => p.id === id)
  );

  return {
    id: 1,
    title: "Current",
    projects: staffedProjects.map((p) => {
      const projectAssignments = assignments.filter((a) => a.project_id === p.id);

      const projectStart = new Date(Math.min(...projectAssignments.map((p) => dayjs(p.start_date).toDate())));
      const projectEnd = new Date(Math.max(...projectAssignments.map((p) => dayjs(p.end_date).toDate())));

      const staffedPeople = projectAssignments.map((a) => {
        let person = people.find((p) => a.person_id === p.id);
        return {
          ...person,
          firstName: person.first_name,
          lastName: person.last_name,
          assignment: { ...a, startDate: dayjs(a.start_date).toDate(), endDate: dayjs(a.end_date).toDate() },
        };
      });

      return { id: p.id, name: p.name, startDate: projectStart, endDate: projectEnd, people: staffedPeople };
    }),
  };
};
