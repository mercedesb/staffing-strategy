import React, { useState, useEffect } from "react";

import { ProjectList } from "components";
import { useForecast, useLocalStorage } from "hooks";

const PROJECTS_STORAGE_KEY = "projects";

export default function Projects() {
  const { get, set } = useLocalStorage();
  const { getProjects } = useForecast();
  const [projects, setProjects] = useState(get(PROJECTS_STORAGE_KEY) || []);

  useEffect(() => {
    (async function () {
      if (!projects || projects.length === 0) {
        const allProjects = await getProjects();
        setProjects(allProjects);
        set(PROJECTS_STORAGE_KEY, allProjects);
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <ProjectList projects={projects} />;
}
