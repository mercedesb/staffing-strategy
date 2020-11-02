import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Grommet } from "grommet";

import { AssignmentsProvider, DealsProvider, PeopleProvider, ProjectsProvider, ScenariosProvider } from "contexts";
import { Home, Opportunities, People, Projects } from "pages";
import { GrommetTheme } from "lib";
import "./App.css";

function App() {
  return (
    <Grommet theme={GrommetTheme}>
      <Router>
        <div className="App">
          <nav>
            <Box tag="ul" direction="row" justify="end" pad={{ vertical: "small", horizontal: "medium" }}>
              <Box tag="li" direction="row" pad={{ horizontal: "small" }}>
                <Link to="/">Home</Link>
              </Box>
              <Box tag="li" direction="row" pad={{ horizontal: "small" }}>
                <Link to="/people">People</Link>
              </Box>
              <Box tag="li" direction="row" pad={{ horizontal: "small" }}>
                <Link to="/projects">Projects</Link>
              </Box>
              <Box tag="li" direction="row" pad={{ horizontal: "small" }}>
                <Link to="/opportunities">Opportunities</Link>
              </Box>
            </Box>
          </nav>

          <PeopleProvider>
            <AssignmentsProvider>
              <ProjectsProvider>
                <ScenariosProvider>
                  <DealsProvider>
                    <Switch>
                      <Route path="/people">
                        <People />
                      </Route>
                      <Route path="/projects">
                        <Projects />
                      </Route>
                      <Route path="/opportunities">
                        <Opportunities />
                      </Route>
                      <Route path="/">
                        <Home />
                      </Route>
                    </Switch>
                  </DealsProvider>
                </ScenariosProvider>
              </ProjectsProvider>
            </AssignmentsProvider>
          </PeopleProvider>
        </div>
      </Router>
    </Grommet>
  );
}

export default App;
