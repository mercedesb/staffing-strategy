import React, { useState, useEffect, createContext } from "react";
import { useAirtable, useForecast, useLocalStorage } from "hooks";

const CURRENT_PEOPLE_STORAGE_KEY = "currentPeople";
const BILLABLE_PEOPLE_STORAGE_KEY = "billablePeople";
const UPCOMING_PEOPLE_STORAGE_KEY = "upcomingPeople";

export const PeopleContext = createContext({
  currentPeople: [],
  // setCurrentPeople: () => {},
  billablePeople: [],
  // setBillablePeople: () => {},
  upcomingPeople: [],
  // setUpcomingPeople: () => {},
  allPeople: [],
  // setAllPeople: () => {},
});

export function PeopleProvider({ children }) {
  const { get, set } = useLocalStorage();
  const { getPeople: getCurrentPeople } = useForecast();
  const { getPeople: getUpcomingPeople } = useAirtable();

  const [currentPeople, setCurrentPeople] = useState([]);
  const [billablePeople, setBillablePeople] = useState([]);
  const [upcomingPeople, setUpcomingPeople] = useState([]);
  const [allPeople, setAllPeople] = useState([]);

  useEffect(() => {
    (async function () {
      let billablePeopleResponse = get(BILLABLE_PEOPLE_STORAGE_KEY) || billablePeople;
      let currentPeopleResponse = get(CURRENT_PEOPLE_STORAGE_KEY) || currentPeople;
      let upcomingPeopleResponse = get(UPCOMING_PEOPLE_STORAGE_KEY) || upcomingPeople;

      if (!currentPeople || currentPeople.length === 0) {
        currentPeopleResponse = await getCurrentPeople();
        setCurrentPeople(currentPeopleResponse);
        set(CURRENT_PEOPLE_STORAGE_KEY, currentPeopleResponse);

        billablePeopleResponse = currentPeopleResponse.filter(
          (p) => !p.archived && p.weekly_capacity > 0 && p.roles.includes("Billable")
        );
        setBillablePeople(billablePeopleResponse);
        set(BILLABLE_PEOPLE_STORAGE_KEY, billablePeopleResponse);
      }

      if (!upcomingPeople || upcomingPeople.length === 0) {
        upcomingPeopleResponse = await getUpcomingPeople();
        setUpcomingPeople(upcomingPeopleResponse);
        set(UPCOMING_PEOPLE_STORAGE_KEY, upcomingPeopleResponse);
      }

      setAllPeople([...billablePeopleResponse, ...upcomingPeopleResponse]);
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PeopleContext.Provider value={{ allPeople, billablePeople, currentPeople, upcomingPeople }}>
      {children}
    </PeopleContext.Provider>
  );
}
