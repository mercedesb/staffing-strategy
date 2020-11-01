import React, { useState, useEffect, createContext } from "react";
import { useAirtable } from "hooks";

export const ScenariosContext = createContext({
  currentScenarios: [],
  // setCurrentScenarios: () => {},
  upcomingScenarios: [],
  // setUpcomingScenarios: () => {},
  allScenarios: [],
  // setAllScenarios: () => {},
});

export function ScenariosProvider({ children }) {
  const { getScenarios } = useAirtable();

  const [currentScenarios] = useState([{ id: 0, name: "Current" }]);
  const [upcomingScenarios, setUpcomingScenarios] = useState([]);
  const [allScenarios, setAllScenarios] = useState([]);

  useEffect(() => {
    (async function () {
      let upcomingScenariosResponse = upcomingScenarios;

      if (!upcomingScenarios || upcomingScenarios.length === 0) {
        upcomingScenariosResponse = await getScenarios();
        setUpcomingScenarios(upcomingScenariosResponse);
      }

      setAllScenarios([...currentScenarios, ...upcomingScenariosResponse]);
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScenariosContext.Provider value={{ allScenarios, currentScenarios, upcomingScenarios }}>
      {children}
    </ScenariosContext.Provider>
  );
}
