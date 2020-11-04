import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box } from "reakit/Box";

import { AppContext } from "contexts";
import { Home, Opportunities, People, Projects } from "pages";

function App() {
  return (
    <Box>
      <Router>
        <nav>
          <Box tag="ul" direction="row" justify="end" pad={{ vertical: "small", horizontal: "medium" }}>
            <Box tag="li" direction="row" pad={{ horizontal: "small" }}>
              <Link to="/" className="no-underline">
                Home
              </Link>
            </Box>
            <Box tag="li" direction="row" pad={{ horizontal: "small" }}>
              <Link to="/people" className="no-underline">
                People
              </Link>
            </Box>
            <Box tag="li" direction="row" pad={{ horizontal: "small" }}>
              <Link to="/projects" className="no-underline">
                Projects
              </Link>
            </Box>
            <Box tag="li" direction="row" pad={{ horizontal: "small" }}>
              <Link to="/opportunities" className="no-underline">
                Opportunities
              </Link>
            </Box>
          </Box>
        </nav>

        <AppContext>
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
        </AppContext>
      </Router>
    </Box>
  );
}

export default App;
