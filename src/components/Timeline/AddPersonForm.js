import React, { useState } from "react";
import dayjs from "dayjs";

import { PeopleContext } from "contexts";
import { useAirtable } from "hooks";
import { displayName } from "lib";

export function AddPersonForm({ onSubmit, scenarioId, projectId }) {
  const { allPeople, fetchPeople } = React.useContext(PeopleContext);

  const { createPerson } = useAirtable();

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      scenarioId: [scenarioId],
      projectId: projectId,
      startDate: dayjs(),
      endDate: dayjs().add(1, "month"),
    };

    // if person already exists (check by name), create assignment
    const existingPerson = allPeople.find((p) => displayName(p) === name);
    if (!!existingPerson) {
      data.personId = existingPerson.id;
    } else {
      let personData = {
        firstName: name,
      };
      let createdPerson = await createPerson(personData);
      data.personId = createdPerson.id;
      fetchPeople();
    }

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
