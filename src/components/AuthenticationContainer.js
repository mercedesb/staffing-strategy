import React from "react";
import { Redirect } from "react-router-dom";

import { TokenContext } from "contexts";

export function AuthenticationContainer({ children }) {
  const { jwt } = React.useContext(TokenContext);

  if (!!jwt) {
    return children;
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
}
