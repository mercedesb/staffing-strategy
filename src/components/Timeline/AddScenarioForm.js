import React, { useState } from "react";

export function AddScenarioForm({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { name };
    onSubmit(data);
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
