import React from "react";
import List from "./List";

export function DealList({ deals, stages }) {
  const dealsWithStages = deals.map((d) => ({
    ...d,
    stage: {
      ...stages.find((s) => s.id === d.stage_id),
    },
  }));

  dealsWithStages.sort((a, b) => (a.stage.order_nr < b.stage.order_nr ? -1 : 1));

  return (
    <>
      <h1 className="mb-4">Possible opportunities (Pipedrive)</h1>
      <List
        items={dealsWithStages.map((d) => ({
          ...d,
          displayText: `${d.org_name} - ${d.title} - ${d.stage.name}`,
        }))}
      />
    </>
  );
}
