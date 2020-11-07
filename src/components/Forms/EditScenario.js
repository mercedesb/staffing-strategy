import React from "react";

import { ScenariosContext } from "contexts";
import { useAirtable } from "hooks";

import { ScenarioForm } from "./ScenarioForm";

export function EditScenario({ scenario, deletable }) {
  const { fetchScenarios } = React.useContext(ScenariosContext);

  const { updateScenario } = useAirtable();

  const handleSubmit = async (data) => {
    await updateScenario(data);
    fetchScenarios();
  };

  return <ScenarioForm title={`Edit ${scenario.title}`} onSubmit={handleSubmit} scenario={scenario} />;
}
