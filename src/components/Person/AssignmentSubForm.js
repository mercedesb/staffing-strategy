import React from "react";

import { DateRange, CheckboxInput } from "components";

export function AssignmentSubForm({ assignmentStart, assignmentEnd, onAssignmentStartChange, onAssignmentEndChange }) {
  return (
    <>
      <DateRange
        start={assignmentStart}
        end={assignmentEnd}
        onStartChange={onAssignmentStartChange}
        onEndChange={onAssignmentEndChange}
        required
      />
    </>
  );
}
