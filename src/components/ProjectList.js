import React from "react";
import { Box } from "grommet";

import List from "./List";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export function ProjectList({ currentProjects, upcomingProjects }) {
  dayjs.extend(customParseFormat);

  const ongoingCurrentProjects = currentProjects.filter((p) => dayjs(p.end_date, "YYYY-MM-DD") > dayjs());

  return (
    <>
      <h1>Projects</h1>
      <Box direction="row">
        <Box flex>
          <h2>Current projects</h2>
          <List
            items={ongoingCurrentProjects.map((p) => ({
              ...p,
              displayText: `${p.code} - ${p.name}`,
            }))}
          />
        </Box>
        <Box flex>
          <h2>Upcoming projects</h2>
          <List
            items={upcomingProjects
              .map((p) => ({
                ...p,
                displayText: p.name,
              }))
              .sort((a, b) => (a.likelihood < b.likelihood ? 1 : -1))}
          />
        </Box>
      </Box>
    </>
  );
}
