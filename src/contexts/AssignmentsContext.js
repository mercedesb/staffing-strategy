import React, { useState, useEffect, createContext, useCallback } from "react";
import { useAirtable, useForecast, useLocalStorage } from "hooks";

const CURRENT_ASSIGNMENTS_STORAGE_KEY = "currentAssignments";
const UPCOMING_ASSIGNMENTS_STORAGE_KEY = "upcomingAssignments";

export const AssignmentsContext = createContext({
  currentAssignments: [],
  // setCurrentAssignments: () => {},
  upcomingAssignments: [],
  // setUpcomingAssignments: () => {},
  allAssignments: [],
  // setAllAssignments: () => {},
  fetchAssignments: () => {},
});

export function AssignmentsProvider({ children }) {
  const { get, set } = useLocalStorage();
  const { getAssignments: getCurrentAssignments } = useForecast();
  const { getAssignments: getUpcomingAssignments } = useAirtable();

  const [currentAssignments, setCurrentAssignments] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);

  const fetchCurrentData = useCallback(async () => {
    let currentAssignmentsResponse = await getCurrentAssignments();
    set(CURRENT_ASSIGNMENTS_STORAGE_KEY, currentAssignmentsResponse);
    setCurrentAssignments(currentAssignmentsResponse);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const fetchUpcomingData = useCallback(async () => {
    let upcomingAssignmentsResponse = await getUpcomingAssignments();
    set(UPCOMING_ASSIGNMENTS_STORAGE_KEY, upcomingAssignmentsResponse);
    setUpcomingAssignments(upcomingAssignmentsResponse);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let currentAssignmentsResponse = (get(CURRENT_ASSIGNMENTS_STORAGE_KEY) || currentAssignments).map((a) => {
      let startDate = typeof a.startDate === "string" ? new Date(a.startDate) : a.startDate;
      let endDate = typeof a.endDate === "string" ? new Date(a.endDate) : a.endDate;

      return {
        ...a,
        startDate,
        endDate,
      };
    });

    if (!currentAssignmentsResponse || currentAssignmentsResponse.length === 0) {
      fetchCurrentData();
    } else {
      setCurrentAssignments(currentAssignmentsResponse);
    }

    let upcomingAssignmentsResponse = (get(UPCOMING_ASSIGNMENTS_STORAGE_KEY) || upcomingAssignments).map((a) => {
      let startDate = typeof a.startDate === "string" ? new Date(a.startDate) : a.startDate;
      let endDate = typeof a.endDate === "string" ? new Date(a.endDate) : a.endDate;

      return {
        ...a,
        startDate,
        endDate,
      };
    });

    if (!upcomingAssignmentsResponse || upcomingAssignmentsResponse.length === 0) {
      fetchUpcomingData();
    } else {
      setUpcomingAssignments(upcomingAssignmentsResponse);
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AssignmentsContext.Provider
      value={{
        allAssignments: [...currentAssignments, ...upcomingAssignments],
        currentAssignments,
        upcomingAssignments,
        fetchAssignments: fetchUpcomingData,
      }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
}
