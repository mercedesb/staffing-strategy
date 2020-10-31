import React from "react";

export function DealList({ deals, stages }) {
  const dealsWithStages = deals.map((d) => ({
    ...d,
    stage: {
      ...stages.find((s) => s.id === d.stage_id),
    },
  }));

  dealsWithStages.sort((a, b) =>
    a.stage.order_nr < b.stage.order_nr ? -1 : 1
  );

  return (
    <div>
      <ul>
        {dealsWithStages &&
          dealsWithStages.length > 0 &&
          dealsWithStages.map((d) => (
            <li key={d.id}>{`${d.org_name} - ${d.title} - ${d.stage.name}`}</li>
          ))}
      </ul>
    </div>
  );
}
