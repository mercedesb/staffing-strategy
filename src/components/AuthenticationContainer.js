import React from "react";
import { Redirect } from "react-router-dom";

import { TokenContext } from "contexts";

export function AuthenticationContainer({ children }) {
  const { jwt } = React.useContext(TokenContext);

  if (!!jwt) {
    return (
      <div className="py-4 px-8 my-0 mx-auto" style={{ maxWidth: "1200px" }}>
        {children}
      </div>
    );
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
}
