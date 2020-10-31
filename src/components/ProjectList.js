import React from "react";

export function ProjectList({ projects }) {
  return (
    <div>
      <ul>
        {projects &&
          projects.length > 0 &&
          projects.map((p) => <li key={p.id}>{`${p.code} - ${p.name}`}</li>)}
      </ul>
    </div>
  );
}
