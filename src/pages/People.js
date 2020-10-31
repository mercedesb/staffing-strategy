import React, { useState, useEffect } from "react";

import { PeopleList } from "components";
import { useForecast, useLocalStorage } from "hooks";

const PEOPLE_STORAGE_KEY = "people";

export default function People() {
  const { get, set } = useLocalStorage();
  const { getPeople } = useForecast();
  const [people, setPeople] = useState(get(PEOPLE_STORAGE_KEY) || []);

  useEffect(() => {
    (async function () {
      if (!people || people.length === 0) {
        const allPeople = await getPeople();
        setPeople(allPeople);
        set(PEOPLE_STORAGE_KEY, allPeople);
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <PeopleList people={people} />;
}
