import React, { useState } from "react";
import dayjs from "dayjs";

import { ProjectsContext } from "contexts";
import { useAirtable } from "hooks";

export function AddProjectForm() {
  const { fetchProjects } = React.useContext(ProjectsContext);

  const { createProject } = useAirtable();

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { name, startDate: dayjs(), endDate: dayjs().add(1, "month") };
    await createProject(data);
    fetchProjects();
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
