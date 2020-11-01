import React, { useState, useEffect, createContext } from "react";
import { useAirtable, useForecast, useLocalStorage } from "hooks";

const CURRENT_PEOPLE_STORAGE_KEY = "currentPeople";
const UPCOMING_PEOPLE_STORAGE_KEY = "upcomingPeople";

export const PeopleContext = createContext({
  currentPeople: [],
  // setCurrentPeople: () => {},
  upcomingPeople: [],
  // setUpcomingPeople: () => {},
  allPeople: [],
  // setAllPeople: () => {},
});

export function PeopleProvider({ children }) {
  const { get, set } = useLocalStorage();
  const { getPeople: getCurrentPeople } = useForecast();
  const { getPeople: getUpcomingPeople } = useAirtable();

  const [currentPeople, setCurrentPeople] = useState(get(CURRENT_PEOPLE_STORAGE_KEY) || []);
  const [upcomingPeople, setUpcomingPeople] = useState(get(UPCOMING_PEOPLE_STORAGE_KEY) || []);
  const [allPeople, setAllPeople] = useState([]);

  useEffect(() => {
    (async function () {
      let currentPeopleResponse = currentPeople;
      let upcomingPeopleResponse = upcomingPeople;

      if (!currentPeople || currentPeople.length === 0) {
        currentPeopleResponse = await getCurrentPeople();
        setCurrentPeople(currentPeopleResponse);
        set(CURRENT_PEOPLE_STORAGE_KEY, currentPeopleResponse);
      }

      if (!upcomingPeople || upcomingPeople.length === 0) {
        upcomingPeopleResponse = await getUpcomingPeople();
        setUpcomingPeople(upcomingPeopleResponse);
        set(UPCOMING_PEOPLE_STORAGE_KEY, upcomingPeopleResponse);
      }

      setAllPeople([...currentPeopleResponse, upcomingPeopleResponse]);
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PeopleContext.Provider value={{ allPeople, currentPeople, upcomingPeople }}>{children}</PeopleContext.Provider>
  );
}
