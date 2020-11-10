import React from "react";

import { ScenariosContext } from "contexts";
import { useServer } from "hooks";

import { ScenarioForm } from "./ScenarioForm";

export function AddScenario({ closeModal, initialFocusRef }) {
  const { fetchScenarios } = React.useContext(ScenariosContext);

  const { createScenario } = useServer();

  const handleSubmit = async (data) => {
    await createScenario(data);
    fetchScenarios();
  };

  return (
    <ScenarioForm
      title="Add new scenario"
      onSubmit={handleSubmit}
      onCancel={closeModal}
      initialFocusRef={initialFocusRef}
    />
  );
}
