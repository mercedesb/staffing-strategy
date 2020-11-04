import React from "react";

import List from "./List";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export function ProjectList({ currentProjects, upcomingProjects }) {
  dayjs.extend(customParseFormat);

  const ongoingCurrentProjects = currentProjects.filter((p) => dayjs(p.end_date, "YYYY-MM-DD") > dayjs());

  return (
    <>
      <h1 className="mb-4">Projects</h1>
      <div className="flex">
        <div className="flex-grow">
          <h2 className="mb-4">Current projects</h2>
          <List
            items={ongoingCurrentProjects.map((p) => ({
              ...p,
              displayText: `${p.code} - ${p.name}`,
            }))}
          />
        </div>
        <div className="flex-grow">
          <h2 className="mb-4">Upcoming projects</h2>
          <List
            items={upcomingProjects
              .map((p) => ({
                ...p,
                displayText: p.name,
              }))
              .sort((a, b) => (a.likelihood < b.likelihood ? 1 : -1))}
          />
        </div>
      </div>
    </>
  );
}
