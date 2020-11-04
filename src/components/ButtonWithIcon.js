import React from "react";

export function ButtonWithIcon(props) {
  return (
    <button {...props}>
      <span className="flex items-center">{props.children}</span>
    </button>
  );
}
