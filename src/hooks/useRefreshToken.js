import { useContext } from "react";

import { TokenContext } from "contexts";

const refresh = async (token) => {
  return fetch(`/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

const useRefreshToken = () => {
  const { setJwt, setExpiresAt, refreshTimeout, setRefreshTimeout } = useContext(TokenContext);

  const handleRefresh = (expiresAt, refreshAccessTokenFn) => {
    let refreshAt = expiresAt - 5000; // 5 seconds before expiration
    let refreshTiming = refreshAt - Date.now();
    setExpiresAt(expiresAt);

    let refreshVar = setTimeout(refreshAccessTokenFn, refreshTiming);
    setRefreshTimeout(refreshVar);
  };

  return {
    setRefreshInterval: (token, expiresAt) => {
      const refreshAccessToken = async () => {
        const { accessToken, expiresAt } = await refresh(token);
        handleRefresh(expiresAt, refreshAccessToken);
        setJwt(accessToken);
      };

      handleRefresh(expiresAt, refreshAccessToken);
    },
    clearRefreshInterval: () => {
      clearTimeout(refreshTimeout);
    },
  };
};

export default useRefreshToken;
