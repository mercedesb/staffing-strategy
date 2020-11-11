import React, { useState, useEffect, createContext } from "react";
import { useLocalStorage } from "hooks";

// not guessable
const TOKEN_STORAGE_KEY = process.env.REACT_APP_TOKEN_STORAGE_KEY;
const REFRESH_TIMEOUT_STORAGE_KEY = "refreshTimeout";

export const TokenContext = createContext({
  jwt: null,
  setJwt: () => {},
  refreshTimeout: null,
  setRefreshTimeout: () => {},
});

export function TokenProvider({ children }) {
  const { get, set } = useLocalStorage();
  const [jwt, setJwt] = useState(get(TOKEN_STORAGE_KEY) || null);
  const [refreshTimeout, setRefreshTimeout] = useState(get(REFRESH_TIMEOUT_STORAGE_KEY) || null);

  useEffect(() => {
    set(TOKEN_STORAGE_KEY, jwt);
  }, [jwt]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    set(REFRESH_TIMEOUT_STORAGE_KEY, refreshTimeout);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TokenContext.Provider value={{ jwt, setJwt, refreshTimeout, setRefreshTimeout }}>{children}</TokenContext.Provider>
  );
}
