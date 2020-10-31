import React, { useState, useEffect } from "react";
import "./App.css";

import { Calendar, DealList, PeopleList, ProjectList } from "components";
import { useForecast, useLocalStorage, usePipedrive } from "hooks";

const ASSIGNMENTS_STORAGE_KEY = "assignments";
const PEOPLE_STORAGE_KEY = "people";
const PROJECTS_STORAGE_KEY = "projects";
const DEALS_STORAGE_KEY = "deals";
const STAGES_STORAGE_KEY = "stages";

function App() {
  const { get, set } = useLocalStorage();

  const [assignments, setAssignments] = useState(get(ASSIGNMENTS_STORAGE_KEY) || []);
  const [people, setPeople] = useState(get(PEOPLE_STORAGE_KEY) || []);
  const [projects, setProjects] = useState(get(PROJECTS_STORAGE_KEY) || []);
  const [deals, setDeals] = useState(get(DEALS_STORAGE_KEY) || []);
  const [stages, setStages] = useState(get(STAGES_STORAGE_KEY) || []);

  const { getAssignments, getPeople, getProjects } = useForecast();
  const { getDeals, getStages } = usePipedrive();

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

      if (!deals || deals.length === 0) {
        const dealsResponse = await getDeals();
        setDeals(dealsResponse.data);
        set(DEALS_STORAGE_KEY, dealsResponse.data);
      }

      if (!stages || stages.length === 0) {
        const stagesResponse = await getStages();
        setStages(stagesResponse.data);
        set(STAGES_STORAGE_KEY, stagesResponse.data);
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  let parsedAssignments = assignments.map((a) => ({
    ...a,
    project: projects.find((p) => p.id === a.project_id),
    person: people.find((p) => p.id === a.person_id),
  }));

  return (
    <div className="App">
      <PeopleList people={people} />
      <ProjectList projects={projects} />
      <DealList deals={deals} stages={stages} />
      <Calendar events={parsedAssignments} />
    </div>
  );
}

export default App;
