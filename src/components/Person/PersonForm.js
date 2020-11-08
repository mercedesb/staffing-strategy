import React, { useState } from "react";

import { FormButtonContainer, RadioGroup, TextInput } from "components";

export function PersonForm({ title, person, onSubmit, onCancel, initialFocusRef }) {
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
        <TextInput
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          label="First Name"
          inputRef={initialFocusRef}
          required
        />
        <TextInput
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          label="Last Name"
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
          required
          value={department}
        />

        <FormButtonContainer onCancel={onCancel} />
      </form>
    </>
  );
}
