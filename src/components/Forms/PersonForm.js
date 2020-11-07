import React, { useState } from "react";

import { Button, RadioGroup, TextInput } from "components";

export function PersonForm({ title, person, onSubmit, onCancel }) {
  debugger;
  const [firstName, setFirstName] = useState(person && person.firstName ? person.firstName : "");
  const [lastName, setLastName] = useState(person && person.lastName ? person.lastName : "");
  const [department, setDepartment] = useState(person && person.roles ? person.roles : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      firstName: firstName,
      lastName: lastName,
      roles: department,
    };
    onSubmit(data);
  };

  return (
    <>
      <h2 className="pb-8">{title}</h2>
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
          value={department}
        />

        <div className="pt-8">
          <Button primary type="submit">
            Save
          </Button>
          <Button secondary onClick={onCancel} className="ml-4">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
