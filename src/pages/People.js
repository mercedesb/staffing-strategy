import React from "react";

import { PeopleContext } from "contexts";
import { PeopleList } from "components";

export default function People() {
  const { billablePeople, upcomingPeople } = React.useContext(PeopleContext);

  return (
    <>
      <h1>Current team</h1>
      <PeopleList people={billablePeople} />

      <h1>Upcoming hires</h1>
      <PeopleList people={upcomingPeople} />
    </>
  );
}
