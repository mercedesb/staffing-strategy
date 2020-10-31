import React from "react";
import List from "./List";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export function ProjectList({ projects }) {
  dayjs.extend(customParseFormat);

  const currentProjects = projects.filter(
    (p) => dayjs(p.end_date, "YYYY-MM-DD") > dayjs()
  );

  return (
    <>
      <h2>Current projects</h2>
      <List
        items={currentProjects.map((p) => ({
          ...p,
          displayText: `${p.code} - ${p.name}`,
        }))}
      />
    </>
  );
}
