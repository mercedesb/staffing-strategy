import React, { useState } from "react";
import Select from "react-select";
import dayjs from "dayjs";

import { PeopleContext } from "contexts";
import { FormButtonContainer } from "components";
import { sortByName, displayName, displayRoles } from "lib";

import { AssignmentSubForm } from "./AssignmentSubForm";

export function ChoosePerson({ assignments, onSubmit, onCancel, initialFocusRef }) {
  const { allPeople } = React.useContext(PeopleContext);

  const projectPeople = assignments.map((p) => p.personId);

  const [person, setPerson] = useState({});
  const [assignmentStart, setAssignmentStart] = useState(
    person && person.assignment ? person.assignment.startDate : new Date()
  );
  const [assignmentEnd, setAssignmentEnd] = useState(
    person && person.assignment ? person.assignment.endDate : dayjs().add(1, "month").toDate()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const personToAddToProject = allPeople.find((p) => p.id === person.value);
    let data = {
      person: personToAddToProject,
      assignment: {
        startDate: assignmentStart,
        endDate: assignmentEnd,
      },
    };
    onSubmit(data);
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
