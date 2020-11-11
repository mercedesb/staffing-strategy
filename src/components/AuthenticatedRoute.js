import React from "react";
import { Route, Redirect } from "react-router-dom";

import { NavLayout } from "components";
import { TokenContext } from "contexts";

export function AuthenticatedRoute({ component: Component, ...routeProps }) {
  const { authed } = React.useContext(TokenContext);

  if (!!authed) {
    return (
      <NavLayout>
        <Route
          {...routeProps}
          render={(props) =>
            React.createElement(
              "div",
              { ...props, ...routeProps },
              React.createElement(Component, { ...props, ...routeProps })
            )
          }
        />
      </NavLayout>
    );
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
}
