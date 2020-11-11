import React from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";

import { TokenContext } from "contexts";
import { useRefreshToken } from "hooks";

export default function Login() {
  const { jwt, setJwt } = React.useContext(TokenContext);
  const { setRefreshInterval } = useRefreshToken();

  const login = async (code) => {
    return fetch(`${process.env.REACT_APP_SERVER_API_URL}/api/auth/google`, {
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

  if (!!jwt) {
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login with google"
        responseType="code"
        redirectUri={process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URI}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    );
  }
}
