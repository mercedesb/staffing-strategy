import React, { useState } from "react";
import dayjs from "dayjs";

export function AddProjectForm({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { name, startDate: dayjs(), endDate: dayjs().add(1, "month") };
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
