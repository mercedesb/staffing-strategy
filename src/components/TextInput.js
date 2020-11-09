import React from "react";
import { Input } from "reakit/Input";

export function TextInput(props) {
  const { label, inputRef } = props;

  return (
    <div className="pb-4">
      <label className={`w-full flex flex-col ${props.disabled ? "text-tandemDarkGray" : ""}`}>
        {label}
        <Input
          {...props}
          className="border-tandemMdGray border-b border-t-0 border-l-0 border-r-0 mb-2 leading-4 p-2"
          style={{ height: "2.5rem" }}
          ref={inputRef}
        />
      </label>
    </div>
  );
}
