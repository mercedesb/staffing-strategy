import React, { useState, useEffect, createContext } from "react";
import { useForecast, useLocalStorage } from "hooks";

const CURRENT_PROJECTS_STORAGE_KEY = "currentProjects";
// const UPCOMING_PROJECTS_STORAGE_KEY = "upcomingProjects";

export const ProjectsContext = createContext({
  currentProjects: [],
  // setCurrentProjects: () => {},
  upcomingProjects: [],
  // setUpcomingProjects: () => {},
  allProjects: [],
  // setAllProjects: () => {},
});

export function ProjectsProvider({ children }) {
  const { get, set } = useLocalStorage();
  const { getProjects: getCurrentProjects } = useForecast();
  // const { getProjects: getUpcomingProjects } = useAirtable();

  const [currentProjects, setCurrentProjects] = useState(get(CURRENT_PROJECTS_STORAGE_KEY) || []);
  // const [upcomingProjects, setUpcomingProjects] = useState(get(UPCOMING_PROJECTS_STORAGE_KEY) || []);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    (async function () {
      let currentProjectsResponse = currentProjects;
      // let upcomingProjectsResponse = upcomingProjects;

      if (!currentProjects || currentProjects.length === 0) {
        currentProjectsResponse = await getCurrentProjects();
        setCurrentProjects(currentProjectsResponse);
        set(CURRENT_PROJECTS_STORAGE_KEY, currentProjectsResponse);
      }

      // if (!upcomingProjects || upcomingProjects.length === 0) {
      //   upcomingProjectsResponse = await getUpcomingProjects();
      //   setUpcomingProjects(upcomingProjectsResponse);
      //   set(UPCOMING_PROJECTS_STORAGE_KEY, upcomingProjectsResponse);
      // }

      setAllProjects([...currentProjectsResponse]);
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <ProjectsContext.Provider value={{ allProjects, currentProjects }}>{children}</ProjectsContext.Provider>;
}
