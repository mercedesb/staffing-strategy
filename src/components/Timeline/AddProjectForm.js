import React, { useState } from "react";
import dayjs from "dayjs";

import { Button, TextInput } from "components";
import { ProjectsContext } from "contexts";
import { useAirtable } from "hooks";

export function AddProjectForm({ scenarioId }) {
  const { fetchProjects } = React.useContext(ProjectsContext);

  const { createProject } = useAirtable();

  const [name, setName] = useState("");
  const [seats, setSeats] = useState({ engineeringSeats: 2, designSeats: 2, engagementSeats: 1 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name,
      scenarios: [scenarioId],
      startDate: dayjs(),
      endDate: dayjs().add(1, "month"),
      engineeringSeats: parseInt(seats.engineeringSeats),
      designSeats: parseInt(seats.designSeats),
      engagementSeats: parseInt(seats.engagementSeats),
    };
    await createProject(data);
    fetchProjects();
  };

  return (
    <>
      <h2 className="pb-8">Add new project</h2>
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

        <div className="pt-8">
          <Button primary type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
