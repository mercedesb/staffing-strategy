import React, { useState, useEffect } from "react";
import { IconPlus, IconClick } from "tabler-icons";

import { ButtonWithIcon } from "components";
import { AssignmentsContext, PeopleContext, ProjectsContext } from "contexts";
import { useServer } from "hooks";
import { PersonForm } from "./PersonForm";
import { ChoosePerson } from "./ChoosePerson";

export function AddPerson({ scenarioId, projectId, closeModal, initialFocusRef }) {
  const { allAssignments, fetchAssignments } = React.useContext(AssignmentsContext);
  const { fetchPeople } = React.useContext(PeopleContext);
  const { allProjects } = React.useContext(ProjectsContext);

  const { createAssignment, createPerson } = useServer();

  const project = allProjects.find((p) => p.id === projectId);
  const projectAssignments = allAssignments.filter((a) => a.projectId === projectId && a.scenarioId === scenarioId);

  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    initialFocusRef.current.focus();
  }, [addNew, initialFocusRef]);

  const handleAddNew = async (data) => {
    let createdPerson = await createPerson(data.person);
    fetchPeople();
    createAssignmentForPerson(createdPerson.id, data.assignment);
  };

  const handleAddExisting = async (data) => {
    const { person, assignment } = data;
    createAssignmentForPerson(person.id, assignment);
  };

  const createAssignmentForPerson = async (personId, assignment) => {
    let data = {
      personId,
      scenarioId: [scenarioId],
      projectId: projectId,
      startDate: assignment.startDate,
      endDate: assignment.endDate,
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
          defaultStartDate={project ? project.startDate : null}
          defaultEndDate={project ? project.endDate : null}
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
