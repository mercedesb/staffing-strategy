import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AssignmentsProvider, DealsProvider, PeopleProvider, ProjectsProvider, ScenariosProvider } from "contexts";
import { Home, Opportunities, People, Projects } from "pages";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/opportunities">Opportunities</Link>
            </li>
          </ul>
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
  );
}

export default App;
