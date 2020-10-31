import React, { useState, useEffect } from "react";
import "./App.css";

import { DealList, ProjectList } from "components";
import { useForecast, useLocalStorage, usePipedrive } from "hooks";

const PROJECTS_STORAGE_KEY = "projects";
const DEALS_STORAGE_KEY = "deals";
const STAGES_STORAGE_KEY = "stages";

function App() {
  const { get, set } = useLocalStorage();

  const [projects, setProjects] = useState(get(PROJECTS_STORAGE_KEY) || []);
  const [deals, setDeals] = useState(get(DEALS_STORAGE_KEY) || []);
  const [stages, setStages] = useState(get(STAGES_STORAGE_KEY) || []);

  const { getProjects } = useForecast();
  const { getDeals, getStages } = usePipedrive();

  useEffect(() => {
    (async function () {
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

  return (
    <div className="App">
      <ProjectList projects={projects} />
      <DealList deals={deals} stages={stages} />
    </div>
  );
}

export default App;
