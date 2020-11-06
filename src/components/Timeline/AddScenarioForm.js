import React, { useState } from "react";

import { Button, TextInput } from "components";
import { ScenariosContext } from "contexts";
import { useAirtable } from "hooks";

export function AddScenarioForm() {
  const { fetchScenarios } = React.useContext(ScenariosContext);

  const { createScenario } = useAirtable();

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { name };
    await createScenario(data);
    fetchScenarios();
  };

  return (
    <>
      <h2 className="pb-8">Add new scenario</h2>
      <form onSubmit={handleSubmit}>
        <TextInput type="text" onChange={(e) => setName(e.target.value)} value={name} label="Name" />

        <Button primary type="submit">
          Save
        </Button>
      </form>
    </>
  );
}
