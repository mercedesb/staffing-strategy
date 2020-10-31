import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import useForecast from "hooks/useForecast";

function App() {
  const [projects, setProjects] = useState([]);
  const { getProjects } = useForecast();

  useEffect(() => {
    (async function () {
      const allProjects = await getProjects();
      setProjects(allProjects);
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
        <div>
          <ul>
            {projects &&
              projects.length > 0 &&
              projects.map((p) => <li>{`${p.code} - ${p.name}`}</li>)}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
