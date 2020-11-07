import React from "react";

import { ScenariosContext } from "contexts";
import { useAirtable } from "hooks";

import { ScenarioForm } from "./ScenarioForm";

export function AddScenario({ closeModal }) {
  const { fetchScenarios } = React.useContext(ScenariosContext);

  const { createScenario } = useAirtable();

  const handleSubmit = async (data) => {
    await createScenario(data);
    fetchScenarios();
  };

  return <ScenarioForm title="Add new scenario" onSubmit={handleSubmit} onCancel={closeModal} />;
}
