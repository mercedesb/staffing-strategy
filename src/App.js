import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AppContext, TokenProvider } from "contexts";
import { AuthenticationContainer, AuthenticatedRoute } from "components";
import { Home, Login, Logout, Opportunities, People, Projects } from "pages";

function App() {
  return (
    <TokenProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
        <AuthenticationContainer>
          <AppContext>
            <Switch>
              <AuthenticatedRoute path="/people">
                <People />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/projects">
                <Projects />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/opportunities">
                <Opportunities />
              </AuthenticatedRoute>
              <AuthenticatedRoute exact={true} path="/">
                <Home />
              </AuthenticatedRoute>
            </Switch>
          </AppContext>
        </AuthenticationContainer>
      </Router>
    </TokenProvider>
  );
}

export default App;
