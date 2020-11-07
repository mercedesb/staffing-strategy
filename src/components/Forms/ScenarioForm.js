import React, { useState } from "react";

import { Button, TextInput } from "components";

export function ScenarioForm({ onSubmit, title, scenario }) {
  const [name, setName] = useState(scenario && scenario.title ? scenario.title : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { name };
    onSubmit(data);
  };

  return (
    <>
      <h2 className="pb-8">{title}</h2>
      <form onSubmit={handleSubmit}>
        <TextInput type="text" onChange={(e) => setName(e.target.value)} value={name} label="Name" />

        <div className="pt-8">
          <Button primary type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
