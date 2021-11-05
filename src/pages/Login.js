import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";

import { TokenContext } from "contexts";
import { Logo } from "components";
import { useRefreshToken } from "hooks";

export default function Login() {
  const { authed, setJwt } = React.useContext(TokenContext);
  const { setRefreshInterval } = useRefreshToken();
  const [clientCredentials, setClientCredentials] = useState();

  useEffect(() => {
    const fetchClientCredentials = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_API_URL}/api/auth/clientCredentials`, {
        method: "GET",
      });

      const responseBody = await response.json();

      setClientCredentials(responseBody);
    };
    fetchClientCredentials();
  }, []);

  const login = async (code) => {
    return fetch(`${process.env.REACT_APP_SERVER_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    });
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await login(authResult["code"]);
        setJwt(result.accessToken);
        setRefreshInterval(result.refreshToken, result.expiresAt);
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!!authed) {
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return (
      <div className="h-screen w-full bg-penParchment flex items-center pl-16 loginPage">
        <div>
          <Logo />
          <h2 className="pt-16 pb-4 text-gracefulGreen text-4xl">Staffing</h2>
          {clientCredentials && (
            <GoogleLogin
              clientId={clientCredentials.clientId}
              buttonText="Login with Google"
              responseType="code"
              redirectUri={clientCredentials.redirectURL}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
      </div>
    );
  }
}
