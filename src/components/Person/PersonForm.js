import React, { useState } from "react";
import dayjs from "dayjs";

import { FormButtonContainer, RadioGroup, TextInput } from "components";
import { inputValueRoles } from "lib";

import { AssignmentSubForm } from "./AssignmentSubForm";

export function PersonForm({ title, person, onSubmit, onCancel, initialFocusRef }) {
  const [firstName, setFirstName] = useState(person && person.firstName ? person.firstName : "");
  const [lastName, setLastName] = useState(person && person.lastName ? person.lastName : "");
  const [department, setDepartment] = useState(person && person.roles ? inputValueRoles(person.roles)[0] : "");
  const [assignmentStart, setAssignmentStart] = useState(
    person && person.assignment ? person.assignment.startDate : new Date()
  );
  const [assignmentEnd, setAssignmentEnd] = useState(
    person && person.assignment ? person.assignment.endDate : dayjs().add(1, "month").toDate()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      person: {
        firstName: firstName,
        lastName: lastName,
        roles: department,
      },
      assignment: {
        startDate: assignmentStart,
        endDate: assignmentEnd,
      },
    };
    onSubmit(data);
  };

  return (
    <>
      <h2 className="pb-8">{title}</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          label="First Name"
          inputRef={initialFocusRef}
          disabled={person ? !person.editable : false}
          required
        />
        <TextInput
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          label="Last Name"
          disabled={person ? !person.editable : false}
          required
        />
        <RadioGroup
          label="Department"
          items={[
            { value: "Development", label: "Engineering" },
            { value: "Design", label: "Design" },
            { value: "Growth", label: "Engagement" },
          ]}
          onChange={(e) => setDepartment(e.target.value)}
          disabled={person ? !person.editable : false}
          required
          value={department}
        />

        <AssignmentSubForm
          assignmentStart={assignmentStart}
          onAssignmentStartChange={(date) => setAssignmentStart(date)}
          assignmentEnd={assignmentEnd}
          onAssignmentEndChange={(date) => setAssignmentEnd(date)}
        />
        <FormButtonContainer onCancel={onCancel} />
      </form>
    </>
  );
}
