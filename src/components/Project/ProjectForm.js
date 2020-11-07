import React, { useState } from "react";
import dayjs from "dayjs";

import { FormButtonContainer, TextInput } from "components";

export function ProjectForm({ title, project, onSubmit, onCancel, initialFocusRef }) {
  const defaultNewProjectSeats = { engineeringSeats: 2, designSeats: 2, engagementSeats: 1 };

  const [name, setName] = useState(project && project.name ? project.name : "");
  const [seats, setSeats] = useState(
    project
      ? {
          engineeringSeats: project.engineeringSeats || 0,
          designSeats: project.designSeats || 0,
          engagementSeats: project.engagementSeats || 0,
        }
      : defaultNewProjectSeats
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      name,
      startDate: dayjs(),
      endDate: dayjs().add(1, "month"),
      engineeringSeats: parseInt(seats.engineeringSeats),
      designSeats: parseInt(seats.designSeats),
      engagementSeats: parseInt(seats.engagementSeats),
    };
    onSubmit(data);
  };

  return (
    <>
      <h2 className="pb-8">{title}</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          label="Name"
          inputRef={initialFocusRef}
        />
        <TextInput
          type="number"
          onChange={(e) => setSeats({ ...seats, engineeringSeats: e.target.value })}
          value={seats.engineeringSeats}
          label="Engineering Seats"
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

        <FormButtonContainer onCancel={onCancel} />
      </form>
    </>
  );
}
