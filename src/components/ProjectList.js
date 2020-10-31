import React from "react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export function ProjectList({ projects }) {
  dayjs.extend(customParseFormat);

  const currentProjects = projects.filter(
    (p) => dayjs(p.end_date, "YYYY-MM-DD") > dayjs()
  );

  return (
    <div>
      <ul>
        {currentProjects &&
          currentProjects.length > 0 &&
          currentProjects.map((p) => (
            <li key={p.id} data-id={p.id}>{`${p.code} - ${p.name}`}</li>
          ))}
      </ul>
    </div>
  );
}
