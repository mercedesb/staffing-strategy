import React from "react";

import { PeopleContext } from "contexts";
import { PeopleList } from "components";

export default function People() {
  const { currentPeople, upcomingPeople } = React.useContext(PeopleContext);

  return (
    <>
      <h1>Current team</h1>
      <PeopleList people={currentPeople.filter((p) => !p.archived && p.weekly_capacity > 0)} />
      <h1>Upcoming hires</h1>
      <PeopleList people={upcomingPeople} />
    </>
  );
}
