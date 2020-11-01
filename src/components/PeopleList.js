import React from "react";
import List from "./List";
import { defaultPeopleSort } from "lib";

export function PeopleList({ people }) {
  // Ronda and Josh are archived, Ronda has no weekly capacity

  const engineers = people.filter((p) => p.roles.includes("Development"));
  const designers = people.filter((p) => p.roles.includes("Design"));
  const engagement = people.filter((p) => p.roles.includes("Growth"));

  return (
    <>
      <h2>Engineers</h2>
      <List items={defaultPeopleSort(engineers.map((p) => ({ ...p, displayText: `${p.firstName} ${p.lastName}` })))} />
      <h2>Designers</h2>
      <List items={defaultPeopleSort(designers.map((p) => ({ ...p, displayText: `${p.firstName} ${p.lastName}` })))} />
      <h2>Engagement</h2>
      <List items={defaultPeopleSort(engagement.map((p) => ({ ...p, displayText: `${p.firstName} ${p.lastName}` })))} />
    </>
  );
}
