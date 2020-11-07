import React, { useState } from "react";
import Select from "react-select";
import dayjs from "dayjs";

import { Button } from "components";
import { AssignmentsContext, PeopleContext } from "contexts";
import { useAirtable } from "hooks";
import { sortByName, displayName, displayRoles } from "lib";
import { PersonForm } from "./PersonForm";

export function AddPerson({ scenarioId, projectId }) {
  const { allAssignments, fetchAssignments } = React.useContext(AssignmentsContext);
  const { allPeople, fetchPeople } = React.useContext(PeopleContext);

  const projectAssignments = allAssignments.filter((a) => a.projectId === projectId);
  const projectPeople = projectAssignments.map((p) => p.personId);

  const { createAssignment, createPerson } = useAirtable();

  const [addNew, setAddNew] = useState(false);
  const [person, setPerson] = useState({});

  const handleAddNew = async (data) => {
    let createdPerson = await createPerson(data);
    fetchPeople();
    createAssignmentForPerson(createdPerson.id);
  };

  const handleAddExisting = async (e) => {
    e.preventDefault();
    const personToAddToProject = allPeople.find((p) => p.id === person.value);
    createAssignmentForPerson(personToAddToProject.id);
  };

  const createAssignmentForPerson = async (personId) => {
    let data = {
      personId,
      scenarioId: [scenarioId],
      projectId: projectId,
      startDate: dayjs(),
      endDate: dayjs().add(1, "month"),
    };

    await createAssignment(data);
    fetchAssignments();
  };

  if (addNew) {
    return <PersonForm title="Add new person" onSubmit={handleAddNew} onCancel={() => setAddNew(false)} />;
  } else {
    return (
      <>
        <h2 className="pb-8">Choose person</h2>
        <form onSubmit={handleAddExisting}>
          <Select
            options={allPeople
              .filter((p) => !projectPeople.includes(p.id))
              .sort(sortByName)
              .map((p) => ({ label: `${displayName(p)} (${displayRoles(p.roles)})`, value: p.id }))}
            onChange={(selectedOption) => setPerson(selectedOption)}
            className="mb-4"
          />

          <div className="pt-8">
            <Button primary type="submit">
              Save
            </Button>
            <Button secondary onClick={() => setAddNew(true)} className="ml-4">
              Create new person
            </Button>
          </div>
        </form>
      </>
    );
  }
}
