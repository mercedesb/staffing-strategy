import { useContext } from "react";

import { TokenContext } from "contexts";

const refresh = async (token) => {
  return fetch(`${process.env.REACT_APP_SERVER_API_URL}/api/auth/refresh`, {
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
  const { setJwt, refreshTimeout, setRefreshTimeout } = useContext(TokenContext);

  return {
    setRefreshInterval: (token, expiresAt) => {
      // Timing to renew access token
      let refreshAt = expiresAt - 5000; // 5 seconds before expiration
      let refreshTiming = refreshAt - Date.now();

      const refreshAccessToken = async () => {
        const { expiresAt, accessToken } = await refresh(token);
        let refreshAt = expiresAt - 5000; // 5 seconds before expiration
        let refreshTiming = refreshAt - Date.now();
        setJwt(accessToken);

        // Setup the other timer after the first one
        let refreshVar = setTimeout(refreshAccessToken, refreshTiming);
        setRefreshTimeout(refreshVar);
      };

      // Setup first refresh timer
      let refreshVar = setTimeout(refreshAccessToken, refreshTiming);
      setRefreshTimeout(refreshVar);
    },
    clearRefreshInterval: () => {
      clearTimeout(refreshTimeout);
    },
  };
};

export default useRefreshToken;
