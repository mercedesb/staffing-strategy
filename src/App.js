import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DealList, ProjectList } from "components";
import { useForecast, usePipedrive } from "hooks";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function App() {
  dayjs.extend(customParseFormat);

  const [projects, setProjects] = useState([]);
  const [deals, setDeals] = useState([]);
  const [stages, setStages] = useState([]);

  const { getProjects } = useForecast();
  const { getDeals, getStages } = usePipedrive();

  useEffect(() => {
    (async function () {
      const allProjects = await getProjects();
      const currentProjects = allProjects.filter(
        (p) => dayjs(p.end_date, "YYYY-MM-DD") > dayjs()
      );
      setProjects(currentProjects);

      const dealsResponse = await getDeals();
      setDeals(dealsResponse.data);

      const stagesResponse = await getStages();
      setStages(stagesResponse.data);
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ProjectList projects={projects} />
        <DealList deals={deals} stages={stages} />
      </header>
    </div>
  );
}

export default App;
