import React, { useState } from "react";
import dayjs from "dayjs";

import { Button, TextInput } from "components";
import { ProjectsContext } from "contexts";
import { useAirtable } from "hooks";

export function AddProjectForm() {
  const { fetchProjects } = React.useContext(ProjectsContext);

  const { createProject } = useAirtable();

  const [name, setName] = useState("");
  const [seats, setSeats] = useState({ engineeringSeats: 0, designSeats: 0, engagementSeats: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { name, startDate: dayjs(), endDate: dayjs().add(1, "month"), ...seats };
    await createProject(data);
    fetchProjects();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput type="text" onChange={(e) => setName(e.target.value)} value={name} label="Name" />
      <TextInput
        type="number"
        onChange={(e) => setSeats({ ...seats, engineeringSeats: e.target.value })}
        value={seats.engineeringSeats}
        label="Engagement Seats"
      />
      <TextInput
        type="number"
        onChange={(e) => setSeats({ ...seats, designSeats: e.target.value })}
        value={seats.designSeats}
        label="Design Seats"
      />
      <TextInput
        type="number"
        onChange={(e) => setSeats({ ...seats, engagementSeats: e.target.value })}
        value={seats.engagementSeats}
        label="Engagement Seats"
      />

      <Button primary type="submit">
        Save
      </Button>
    </form>
  );
}
