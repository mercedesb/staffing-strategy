import React from "react";
import { IconTrash } from "tabler-icons";

import { AssignmentsContext, PeopleContext } from "contexts";
import { useServer } from "hooks";

import { ButtonWithIcon } from "components";
import { displayName } from "lib";
import { PersonForm } from "./PersonForm";

export function EditPerson({ person, deletable, closeModal, initialFocusRef }) {
  const { fetchAssignments } = React.useContext(AssignmentsContext);
  const { fetchPeople } = React.useContext(PeopleContext);

  const { updateAssignment, updatePerson, deleteAssignment } = useServer();

  const handleSubmit = async (data) => {
    if (person.editable) {
      await updatePerson(person.id, { ...person, ...data.person });
      fetchPeople();
    }

    await updateAssignment(person.assignment.id, { ...person.assignment, ...data.assignment });
    fetchAssignments();
  };

  const handleDelete = async () => {
    await deleteAssignment(person.assignment.id);
    fetchAssignments();
  };

  return (
    <>
      <PersonForm
        title={`Edit ${displayName(person)}`}
        person={person}
        onSubmit={handleSubmit}
        onCancel={closeModal}
        initialFocusRef={initialFocusRef}
      />
      {deletable && (
        <div className="w-full flex justify-end mt-8">
          <ButtonWithIcon onClick={handleDelete} className="noBtn text-ripenedRed w-auto">
            <IconTrash /> Delete assignment
          </ButtonWithIcon>
        </div>
      )}
    </>
  );
}
