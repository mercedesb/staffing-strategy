import React from "react";
import { IconTrash } from "tabler-icons";

import { ScenariosContext } from "contexts";
import { useAirtable } from "hooks";

import { ButtonWithIcon } from "components";
import { ScenarioForm } from "./ScenarioForm";

export function EditScenario({ scenario, deletable }) {
  const { fetchScenarios } = React.useContext(ScenariosContext);

  const { updateScenario, deleteScenario } = useAirtable();

  const handleSubmit = async (data) => {
    await updateScenario(scenario.id, data);
    fetchScenarios();
  };

  const handleDelete = async () => {
    await deleteScenario(scenario.id);
    fetchScenarios();
  };

  return (
    <>
      <ScenarioForm title={`Edit ${scenario.title}`} onSubmit={handleSubmit} scenario={scenario} />
      {deletable && (
        <div className="w-full flex justify-end mt-8">
          <ButtonWithIcon onClick={handleDelete} className="noBtn text-ripenedRed w-auto">
            <IconTrash /> Delete scenario
          </ButtonWithIcon>
        </div>
      )}
    </>
  );
}
