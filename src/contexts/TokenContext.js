import React, { useState, useEffect, createContext } from "react";
import { useLocalStorage } from "hooks";

// not guessable
const TOKEN_STORAGE_KEY = process.env.REACT_APP_TOKEN_STORAGE_KEY;
const EXPIRATION_STORAGE_KEY = "expiration";
const REFRESH_TIMEOUT_STORAGE_KEY = "refreshTimeout";

export const TokenContext = createContext({
  jwt: null,
  setJwt: () => {},
  expiresAt: null,
  setExpiresAt: () => {},
  refreshTimeout: null,
  setRefreshTimeout: () => {},
  authed: false,
});

export function TokenProvider({ children }) {
  const { get, set } = useLocalStorage();
  const [jwt, setJwt] = useState(get(TOKEN_STORAGE_KEY) || null);
  const [expiresAt, setExpiresAt] = useState(get(EXPIRATION_STORAGE_KEY) || null);
  const [refreshTimeout, setRefreshTimeout] = useState(get(REFRESH_TIMEOUT_STORAGE_KEY) || null);

  useEffect(() => {
    set(TOKEN_STORAGE_KEY, jwt);
  }, [jwt]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    set(REFRESH_TIMEOUT_STORAGE_KEY, refreshTimeout);
  }, [refreshTimeout]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    set(EXPIRATION_STORAGE_KEY, expiresAt);
  }, [expiresAt]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TokenContext.Provider
      value={{
        jwt,
        setJwt,
        refreshTimeout,
        setRefreshTimeout,
        expiresAt,
        setExpiresAt,
        authed: !!jwt && expiresAt > Date.now(),
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}
