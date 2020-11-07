import React from "react";
import { IconTrash } from "tabler-icons";

import { PeopleContext } from "contexts";
import { useAirtable } from "hooks";

import { ButtonWithIcon } from "components";
import { displayName } from "lib";
import { PersonForm } from "./PersonForm";

export function EditPerson({ person, deletable }) {
  const { fetchPeople } = React.useContext(PeopleContext);

  const { updatePerson, deletePerson } = useAirtable();

  const handleSubmit = async (data) => {
    await updatePerson(person.id, { ...person, ...data });
    fetchPeople();
  };

  const handleDelete = async () => {
    await deletePerson(person.id);
    fetchPeople();
  };

  return (
    <>
      <PersonForm title={`Edit ${displayName(person)}`} person={person} onSubmit={handleSubmit} />
      {deletable && (
        <div className="w-full flex justify-end mt-8">
          <ButtonWithIcon onClick={handleDelete} className="noBtn text-ripenedRed w-auto">
            <IconTrash /> Delete person
          </ButtonWithIcon>
        </div>
      )}
    </>
  );
}
