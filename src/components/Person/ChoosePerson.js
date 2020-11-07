import React, { useState } from "react";
import Select from "react-select";

import { PeopleContext } from "contexts";
import { FormButtonContainer } from "components";
import { sortByName, displayName, displayRoles } from "lib";

export function ChoosePerson({ assignments, onSubmit, onCancel, initialFocusRef }) {
  const { allPeople } = React.useContext(PeopleContext);

  const projectPeople = assignments.map((p) => p.personId);

  const [person, setPerson] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const personToAddToProject = allPeople.find((p) => p.id === person.value);
    onSubmit(personToAddToProject);
  };

  return (
    <>
      <h2 className="pb-8">Choose person</h2>
      <form onSubmit={handleSubmit}>
        <Select
          options={allPeople
            .filter((p) => !projectPeople.includes(p.id))
            .sort(sortByName)
            .map((p) => ({ label: `${displayName(p)} (${displayRoles(p.roles)})`, value: p.id }))}
          onChange={(selectedOption) => setPerson(selectedOption)}
          ref={initialFocusRef}
          className="mb-4"
        />

        <FormButtonContainer onCancel={onCancel} />
      </form>
    </>
  );
}
