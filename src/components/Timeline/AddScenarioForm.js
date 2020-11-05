import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="border border-blue-500 leading-4 p-2 w-full"
          value={name}
        />
      </label>

      <button type="submit">Save</button>
    </form>
  );
}
