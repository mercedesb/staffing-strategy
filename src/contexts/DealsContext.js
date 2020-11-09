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
      let dealsResponse = deals;
      if (process.env.REACT_APP_CACHE_IN_LOCAL_STORAGE) {
        dealsResponse = get(DEALS_STORAGE_KEY) || deals;
      }

      if (!deals || deals.length === 0) {
        dealsResponse = await getDeals();
        setDeals(dealsResponse);
        if (process.env.REACT_APP_CACHE_IN_LOCAL_STORAGE) {
          set(DEALS_STORAGE_KEY, dealsResponse);
        }
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <DealsContext.Provider value={{ deals }}>{children}</DealsContext.Provider>;
}
