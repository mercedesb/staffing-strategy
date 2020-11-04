import React, { useState, useEffect, createContext } from "react";
import { useAirtable, useForecast, useLocalStorage } from "hooks";

const CURRENT_PROJECTS_STORAGE_KEY = "currentProjects";
const UPCOMING_PROJECTS_STORAGE_KEY = "upcomingProjects";

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
  const { getProjects: getUpcomingProjects } = useAirtable();

  const [currentProjects, setCurrentProjects] = useState([]);
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    (async function () {
      let currentProjectsResponse = get(CURRENT_PROJECTS_STORAGE_KEY) || currentProjects;
      let upcomingProjectsResponse = (get(UPCOMING_PROJECTS_STORAGE_KEY) || upcomingProjects).map((a) => {
        let startDate = typeof a.startDate === "string" ? new Date(a.startDate) : a.startDate;
        let endDate = typeof a.endDate === "string" ? new Date(a.endDate) : a.endDate;

        return {
          ...a,
          startDate,
          endDate,
        };
      });

      if (!currentProjects || currentProjects.length === 0) {
        currentProjectsResponse = await getCurrentProjects();
        setCurrentProjects(currentProjectsResponse);
        set(CURRENT_PROJECTS_STORAGE_KEY, currentProjectsResponse);
      }

      if (!upcomingProjects || upcomingProjects.length === 0) {
        upcomingProjectsResponse = await getUpcomingProjects();
        setUpcomingProjects(upcomingProjectsResponse);
        set(UPCOMING_PROJECTS_STORAGE_KEY, upcomingProjectsResponse);
      }

      setAllProjects([...currentProjectsResponse, ...upcomingProjectsResponse]);
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ProjectsContext.Provider value={{ allProjects, currentProjects, upcomingProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}
