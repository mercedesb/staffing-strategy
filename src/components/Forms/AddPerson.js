import React, { useState } from "react";
import dayjs from "dayjs";

import { Button, RadioGroup, TextInput } from "components";
import { AssignmentsContext, PeopleContext } from "contexts";
import { useAirtable } from "hooks";
import { displayName } from "lib";

export function AddPerson({ scenarioId, projectId }) {
  const { fetchAssignments } = React.useContext(AssignmentsContext);
  const { allPeople, fetchPeople } = React.useContext(PeopleContext);

  const { createAssignment, createPerson } = useAirtable();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      scenarioId: [scenarioId],
      projectId: projectId,
      startDate: dayjs(),
      endDate: dayjs().add(1, "month"),
    };

    // if person already exists (check by name), create assignment
    const existingPerson = allPeople.find((p) => displayName(p) === displayName({ firstName, lastName }));
    if (!!existingPerson) {
      data.personId = existingPerson.id;
    } else {
      let personData = {
        firstName: firstName,
        lastName: lastName,
        roles: department,
      };
      let createdPerson = await createPerson(personData);
      data.personId = createdPerson.id;
      fetchPeople();
    }

    await createAssignment(data);
    fetchAssignments();
  };

  return (
    <>
      <h2 className="pb-8">Add new person</h2>
      <form onSubmit={handleSubmit}>
        <TextInput type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} label="First Name" />
        <TextInput type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} label="Last Name" />
        <RadioGroup
          label="Department"
          items={[
            { value: "Development", label: "Engineering" },
            { value: "Design", label: "Design" },
            { value: "Growth", label: "Engagement" },
          ]}
          onChange={(e) => setDepartment(e.target.value)}
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
