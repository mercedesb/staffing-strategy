import React, { useState, useEffect, useCallback, createContext } from "react";
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
  fetchPeople: () => {},
});

export function PeopleProvider({ children }) {
  const { get, set } = useLocalStorage();
  const { getPeople: getCurrentPeople } = useForecast();
  const { getPeople: getUpcomingPeople } = useAirtable();

  const [currentPeople, setCurrentPeople] = useState([]);
  const [billablePeople, setBillablePeople] = useState([]);
  const [upcomingPeople, setUpcomingPeople] = useState([]);

  const fetchCurrentData = useCallback(async () => {
    let currentPeopleResponse = await getCurrentPeople();
    setCurrentPeople(currentPeopleResponse);
    set(CURRENT_PEOPLE_STORAGE_KEY, currentPeopleResponse);

    let billablePeopleResponse = currentPeopleResponse.filter(
      (p) => !p.archived && p.weekly_capacity > 0 && p.roles.includes("Billable")
    );
    setBillablePeople(billablePeopleResponse);
    set(BILLABLE_PEOPLE_STORAGE_KEY, billablePeopleResponse);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const fetchUpcomingData = useCallback(async () => {
    let upcomingPeopleResponse = await getUpcomingPeople();
    setUpcomingPeople(upcomingPeopleResponse);
    set(UPCOMING_PEOPLE_STORAGE_KEY, upcomingPeopleResponse);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let billablePeopleResponse = get(BILLABLE_PEOPLE_STORAGE_KEY) || billablePeople;
    let currentPeopleResponse = get(CURRENT_PEOPLE_STORAGE_KEY) || currentPeople;
    let upcomingPeopleResponse = get(UPCOMING_PEOPLE_STORAGE_KEY) || upcomingPeople;

    if (!currentPeopleResponse || currentPeopleResponse.length === 0) {
      fetchCurrentData();
    } else {
      setCurrentPeople(currentPeopleResponse);
      setBillablePeople(billablePeopleResponse);
    }

    if (!upcomingPeopleResponse || upcomingPeopleResponse.length === 0) {
      fetchUpcomingData();
    } else {
      setUpcomingPeople(upcomingPeopleResponse);
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PeopleContext.Provider
      value={{
        allPeople: [...billablePeople, ...upcomingPeople],
        billablePeople,
        currentPeople,
        upcomingPeople,
        fetchPeople: fetchUpcomingData,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
}
