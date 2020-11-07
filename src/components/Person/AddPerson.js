import React, { useState, useEffect } from "react";
import { IconPlus, IconClick } from "tabler-icons";
import dayjs from "dayjs";

import { ButtonWithIcon } from "components";
import { AssignmentsContext, PeopleContext } from "contexts";
import { useAirtable } from "hooks";
import { PersonForm } from "./PersonForm";
import { ChoosePerson } from "./ChoosePerson";

export function AddPerson({ scenarioId, projectId, closeModal, initialFocusRef }) {
  const { allAssignments, fetchAssignments } = React.useContext(AssignmentsContext);
  const { fetchPeople } = React.useContext(PeopleContext);

  const { createAssignment, createPerson } = useAirtable();

  const projectAssignments = allAssignments.filter((a) => a.projectId === projectId);

  const [addNew, setAddNew] = useState(projectAssignments.length === 0);

  useEffect(() => {
    initialFocusRef.current.focus();
  }, [addNew, initialFocusRef]);

  const handleAddNew = async (data) => {
    let createdPerson = await createPerson(data);
    fetchPeople();
    createAssignmentForPerson(createdPerson.id);
  };

  const handleAddExisting = async (personToAddToProject) => {
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

  const handleCancel = () => {
    setAddNew(false);
    closeModal();
  };

  return (
    <>
      {addNew ? (
        <PersonForm
          title="Add new person"
          onSubmit={handleAddNew}
          onCancel={handleCancel}
          initialFocusRef={initialFocusRef}
        />
      ) : (
        <ChoosePerson
          assignments={projectAssignments}
          onSubmit={handleAddExisting}
          onCancel={handleCancel}
          initialFocusRef={initialFocusRef}
        />
      )}
      <div className="w-full flex justify-end mt-8">
        <ButtonWithIcon onClick={() => setAddNew(!addNew)} className="noBtn text-growingGreen w-auto">
          {addNew ? (
            <>
              <IconClick /> Choose existing person
            </>
          ) : (
            <>
              <IconPlus /> Create new person
            </>
          )}
        </ButtonWithIcon>
      </div>
    </>
  );
}
