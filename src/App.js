import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { AppContext } from "contexts";
import { Home, Opportunities, People, Projects } from "pages";

function App() {
  return (
    <div>
      <Router>
        <nav>
          <ul className="flex justify-end">
            <li className="flex mx-4">
              <Link to="/" className="no-underline">
                Home
              </Link>
            </li>
            <li className="flex mx-4">
              <Link to="/people" className="no-underline">
                People
              </Link>
            </li>
            <li className="flex mx-4">
              <Link to="/projects" className="no-underline">
                Projects
              </Link>
            </li>
            <li className="flex mx-4">
              <Link to="/opportunities" className="no-underline">
                Opportunities
              </Link>
            </li>
          </ul>
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
    </div>
  );
}

export default App;
