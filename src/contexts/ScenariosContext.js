import React, { useState, useEffect, createContext, useCallback, useMemo } from "react";
import { useAirtable, useLocalStorage } from "hooks";

const SCENARIOS_STORAGE_KEY = "scenarios";

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
  const { get, set } = useLocalStorage();
  const { getScenarios } = useAirtable();

  const currentScenarios = useMemo(() => [{ id: "current", name: "Current", current: true }], []);
  const [upcomingScenarios, setUpcomingScenarios] = useState([]);

  const fetchData = useCallback(async () => {
    let upcomingScenariosResponse = await getScenarios();
    set(SCENARIOS_STORAGE_KEY, upcomingScenariosResponse);
    setUpcomingScenarios(upcomingScenariosResponse);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let upcomingScenariosResponse = get(SCENARIOS_STORAGE_KEY) || upcomingScenarios;
    if (!upcomingScenariosResponse || upcomingScenariosResponse.length === 0) {
      fetchData();
    } else {
      setUpcomingScenarios(upcomingScenariosResponse);
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScenariosContext.Provider
      value={{
        allScenarios: [...currentScenarios, ...upcomingScenarios],
        currentScenarios,
        upcomingScenarios,
        fetchScenarios: fetchData,
      }}
    >
      {children}
    </ScenariosContext.Provider>
  );
}
