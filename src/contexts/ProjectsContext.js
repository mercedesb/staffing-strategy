import React, { useState, useEffect, createContext, useCallback } from "react";
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
  fetchProjects: () => {},
});

export function ProjectsProvider({ children }) {
  const { get, set } = useLocalStorage();
  const { getProjects: getCurrentProjects } = useForecast();
  const { getProjects: getUpcomingProjects } = useAirtable();

  const [currentProjects, setCurrentProjects] = useState([]);
  const [upcomingProjects, setUpcomingProjects] = useState([]);

  const fetchCurrentData = useCallback(async () => {
    let currentProjectsResponse = await getCurrentProjects();
    setCurrentProjects(currentProjectsResponse);
    if (process.env.REACT_APP_CACHE_IN_LOCAL_STORAGE) {
      set(CURRENT_PROJECTS_STORAGE_KEY, currentProjectsResponse);
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const fetchUpcomingData = useCallback(async () => {
    let upcomingProjectsResponse = await getUpcomingProjects();
    setUpcomingProjects(upcomingProjectsResponse);
    if (process.env.REACT_APP_CACHE_IN_LOCAL_STORAGE) {
      set(UPCOMING_PROJECTS_STORAGE_KEY, upcomingProjectsResponse);
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let currentProjectsResponse = currentProjects;
    if (process.env.REACT_APP_CACHE_IN_LOCAL_STORAGE) {
      currentProjectsResponse = get(CURRENT_PROJECTS_STORAGE_KEY) || currentProjects;
    }

    let upcomingProjectsResponse = upcomingProjects;
    if (process.env.REACT_APP_CACHE_IN_LOCAL_STORAGE) {
      upcomingProjectsResponse = get(UPCOMING_PROJECTS_STORAGE_KEY) || upcomingProjects;
    }

    upcomingProjectsResponse = upcomingProjectsResponse.map((a) => {
      let startDate = typeof a.startDate === "string" ? new Date(a.startDate) : a.startDate;
      let endDate = typeof a.endDate === "string" ? new Date(a.endDate) : a.endDate;

      return {
        ...a,
        startDate,
        endDate,
      };
    });

    if (!currentProjectsResponse || currentProjectsResponse.length === 0) {
      fetchCurrentData();
    } else {
      setCurrentProjects(currentProjectsResponse);
    }

    if (!upcomingProjectsResponse || upcomingProjectsResponse.length === 0) {
      fetchUpcomingData();
    } else {
      setUpcomingProjects(upcomingProjectsResponse);
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ProjectsContext.Provider
      value={{
        allProjects: [...currentProjects, ...upcomingProjects],
        currentProjects,
        upcomingProjects,
        fetchProjects: fetchUpcomingData,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
