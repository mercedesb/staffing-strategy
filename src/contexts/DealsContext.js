import React, { useState, useEffect, createContext } from "react";
import { useLocalStorage, usePipedrive } from "hooks";

const DEALS_STORAGE_KEY = "deals";

export const DealsContext = createContext({
  deals: [],
});

export function DealsProvider({ children }) {
  const { get, set } = useLocalStorage();
  const { getDeals } = usePipedrive();

  const [deals, setDeals] = useState([]);

  useEffect(() => {
    (async function () {
      let dealsResponse = get(DEALS_STORAGE_KEY) || deals;

      if (!deals || deals.length === 0) {
        dealsResponse = await getDeals();
        setDeals(dealsResponse);
        set(DEALS_STORAGE_KEY, dealsResponse);
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <DealsContext.Provider value={{ deals }}>{children}</DealsContext.Provider>;
}
