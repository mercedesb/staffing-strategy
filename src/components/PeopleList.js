import React from "react";
import List from "./List";

export function PeopleList({ people }) {
  // Ronda and Josh are archived, Ronda has no weekly capacity

  const currentPeople = people.filter(
    (p) => !p.archived && p.weekly_capacity > 0
  );

  const engineers = currentPeople.filter((p) =>
    p.roles.includes("Development")
  );
  const designers = currentPeople.filter((p) => p.roles.includes("Design"));
  const engagement = currentPeople.filter((p) => p.roles.includes("Growth"));

  return (
    <>
      <h2>Engineers</h2>
      <List
        items={engineers.map((p) => ({ ...p, displayText: p.first_name }))}
      />
      <h2>Designers</h2>
      <List
        items={designers.map((p) => ({ ...p, displayText: p.first_name }))}
      />
      <h2>Engagement</h2>
      <List
        items={engagement.map((p) => ({ ...p, displayText: p.first_name }))}
      />
    </>
  );
}
