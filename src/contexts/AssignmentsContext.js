import React, { useState, useEffect, createContext } from "react";
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
});

export function AssignmentsProvider({ children }) {
  const { get, set } = useLocalStorage();
  const { getAssignments: getCurrentAssignments } = useForecast();
  const { getAssignments: getUpcomingAssignments } = useAirtable();

  const [currentAssignments, setCurrentAssignments] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);

  useEffect(() => {
    (async function () {
      let currentAssignmentsResponse = (get(CURRENT_ASSIGNMENTS_STORAGE_KEY) || currentAssignments).map((a) => {
        let startDate = typeof a.startDate === "string" ? new Date(a.startDate) : a.startDate;
        let endDate = typeof a.endDate === "string" ? new Date(a.endDate) : a.endDate;

        return {
          ...a,
          startDate,
          endDate,
        };
      });

      let upcomingAssignmentsResponse = (get(UPCOMING_ASSIGNMENTS_STORAGE_KEY) || upcomingAssignments).map((a) => {
        let startDate = typeof a.startDate === "string" ? new Date(a.startDate) : a.startDate;
        let endDate = typeof a.endDate === "string" ? new Date(a.endDate) : a.endDate;

        return {
          ...a,
          startDate,
          endDate,
        };
      });

      if (!currentAssignments || currentAssignments.length === 0) {
        currentAssignmentsResponse = await getCurrentAssignments();
        set(CURRENT_ASSIGNMENTS_STORAGE_KEY, currentAssignmentsResponse);
      }

      // set state with parsed dates
      setCurrentAssignments(currentAssignmentsResponse);

      if (!upcomingAssignments || upcomingAssignments.length === 0) {
        upcomingAssignmentsResponse = await getUpcomingAssignments();
        set(UPCOMING_ASSIGNMENTS_STORAGE_KEY, upcomingAssignmentsResponse);
      }

      // set state with parsed dates
      setUpcomingAssignments(upcomingAssignmentsResponse);

      setAllAssignments([...currentAssignmentsResponse, ...upcomingAssignmentsResponse]);
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AssignmentsContext.Provider value={{ allAssignments, currentAssignments, upcomingAssignments }}>
      {children}
    </AssignmentsContext.Provider>
  );
}
