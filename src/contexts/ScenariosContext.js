import React, { useState, useEffect, createContext, useCallback, useMemo } from "react";
import { useAirtable } from "hooks";

export const ScenariosContext = createContext({
  currentScenarios: [],
  // setCurrentScenarios: () => {},
  upcomingScenarios: [],
  // setUpcomingScenarios: () => {},
  allScenarios: [],
  // setAllScenarios: () => {},
  fetchScenarios: () => {},
});

export function ScenariosProvider({ children }) {
  const { getScenarios } = useAirtable();

  const currentScenarios = useMemo(() => [{ id: 0, name: "Current" }], []);
  const [upcomingScenarios, setUpcomingScenarios] = useState([]);
  const [allScenarios, setAllScenarios] = useState([]);

  const fetchData = useCallback(async () => {
    let upcomingScenariosResponse = await getScenarios();
    setUpcomingScenarios(upcomingScenariosResponse);
    setAllScenarios([...currentScenarios, ...upcomingScenariosResponse]);
  }, [currentScenarios, getScenarios]);

  useEffect(() => {
    if (!upcomingScenarios || upcomingScenarios.length === 0) {
      fetchData();
    }
  }, [fetchData]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScenariosContext.Provider value={{ allScenarios, currentScenarios, upcomingScenarios, fetchScenarios: fetchData }}>
      {children}
    </ScenariosContext.Provider>
  );
}
