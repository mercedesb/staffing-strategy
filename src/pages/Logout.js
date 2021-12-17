import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { TokenContext } from "contexts";
import { useRefreshToken } from "hooks";

export default function Logout() {
  const { jwt, setJwt } = React.useContext(TokenContext);
  const { clearRefreshInterval } = useRefreshToken();

  useEffect(() => {
    const logout = async () => {
      return fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: jwt }),
      }).then((res) => {
        clearRefreshInterval();
        setJwt(null);

        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      });
    };
    logout();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <Redirect to={{ pathname: "/login" }} />;
}
