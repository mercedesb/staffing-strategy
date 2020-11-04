import React from "react";
import { Box } from "grommet";

import List from "./List";
import { defaultPeopleSort, displayName, isEngineer, isDesigner, isEngagementMgr } from "lib";

export function PeopleList({ people }) {
  // Ronda and Josh are archived, Ronda has no weekly capacity

  const engineers = people.filter((p) => isEngineer(p));
  const designers = people.filter((p) => isDesigner(p));
  const engagement = people.filter((p) => isEngagementMgr(p));

  return (
    <Box direction="row">
      <Box flex>
        <h2>Engineers</h2>
        <List items={defaultPeopleSort(engineers.map((p) => ({ ...p, displayText: displayName(p) })))} />
      </Box>
      <Box flex>
        <h2>Designers</h2>
        <List items={defaultPeopleSort(designers.map((p) => ({ ...p, displayText: displayName(p) })))} />
      </Box>
      <Box flex>
        <h2>Engagement</h2>
        <List items={defaultPeopleSort(engagement.map((p) => ({ ...p, displayText: displayName(p) })))} />
      </Box>
    </Box>
  );
}
