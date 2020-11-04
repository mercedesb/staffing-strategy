import React from "react";

import List from "./List";
import { defaultPeopleSort, displayName, isEngineer, isDesigner, isEngagementMgr } from "lib";

export function PeopleList({ people }) {
  // Ronda and Josh are archived, Ronda has no weekly capacity

  const engineers = people.filter((p) => isEngineer(p));
  const designers = people.filter((p) => isDesigner(p));
  const engagement = people.filter((p) => isEngagementMgr(p));

  return (
    <div className="flex mb-8">
      <div className="flex-grow">
        <h2 className="mb-4">Engineers</h2>
        <List items={defaultPeopleSort(engineers.map((p) => ({ ...p, displayText: displayName(p) })))} />
      </div>
      <div className="flex-grow">
        <h2 className="mb-4">Designers</h2>
        <List items={defaultPeopleSort(designers.map((p) => ({ ...p, displayText: displayName(p) })))} />
      </div>
      <div className="flex-grow">
        <h2 className="mb-4">Engagement</h2>
        <List items={defaultPeopleSort(engagement.map((p) => ({ ...p, displayText: displayName(p) })))} />
      </div>
    </div>
  );
}
