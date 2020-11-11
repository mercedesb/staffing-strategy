import React from "react";

import { DateRange } from "components";

export function AssignmentSubForm({ assignmentStart, assignmentEnd, onAssignmentStartChange, onAssignmentEndChange }) {
  return (
    <>
      <DateRange
        label="Staffing start and end"
        startLabel="Staffing start date"
        endLabel="Staffing end date"
        start={assignmentStart}
        end={assignmentEnd}
        onStartChange={onAssignmentStartChange}
        onEndChange={onAssignmentEndChange}
        required
      />
    </>
  );
}
