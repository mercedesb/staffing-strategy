import React from "react";

export function ButtonWithIcon(props) {
  return (
    <button {...props}>
      <div className="flex items-center">{props.children}</div>
    </button>
  );
}
