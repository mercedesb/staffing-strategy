import React, { useState, useEffect } from "react";

import { Calendar } from "components";
import { useForecast, useLocalStorage } from "hooks";

const ASSIGNMENTS_STORAGE_KEY = "assignments";
const PEOPLE_STORAGE_KEY = "people";
const PROJECTS_STORAGE_KEY = "projects";

export default function Projects() {
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

  let parsedAssignments = assignments.map((a) => ({
    ...a,
    project: projects.find((p) => p.id === a.project_id),
    person: people.find((p) => p.id === a.person_id),
  }));

  return <Calendar events={parsedAssignments} />;
}
