import React from "react";
import List from "./List";

export function PeopleList({ people }) {
  // Ronda and Josh are archived, Ronda has no weekly capacity

  const engineers = people.filter((p) => p.roles.includes("Development"));
  const designers = people.filter((p) => p.roles.includes("Design"));
  const engagement = people.filter((p) => p.roles.includes("Growth"));

  return (
    <>
      <h2>Engineers</h2>
      <List items={engineers.map((p) => ({ ...p, displayText: `${p.firstName} ${p.lastName}` }))} />
      <h2>Designers</h2>
      <List items={designers.map((p) => ({ ...p, displayText: `${p.firstName} ${p.lastName}` }))} />
      <h2>Engagement</h2>
      <List items={engagement.map((p) => ({ ...p, displayText: `${p.firstName} ${p.lastName}` }))} />
    </>
  );
}
