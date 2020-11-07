import React from "react";

import { Button } from "components";

export function FormButtonContainer({ onCancel }) {
  return (
    <div className="pt-8">
      <Button primary type="submit">
        Save
      </Button>
      <Button secondary onClick={onCancel} className="ml-4">
        Cancel
      </Button>
    </div>
  );
}
