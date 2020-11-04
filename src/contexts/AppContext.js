import React from "react";
import { AssignmentsProvider, DealsProvider, PeopleProvider, ProjectsProvider, ScenariosProvider } from "contexts";

export function AppContext({ children }) {
  return (
    <AssignmentsProvider>
      <DealsProvider>
        <PeopleProvider>
          <ProjectsProvider>
            <ScenariosProvider>{children}</ScenariosProvider>
          </ProjectsProvider>
        </PeopleProvider>
      </DealsProvider>
    </AssignmentsProvider>
  );
}
