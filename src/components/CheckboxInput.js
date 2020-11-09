import React from "react";
import { Checkbox } from "reakit/Checkbox";

export function CheckboxInput(props) {
  const { onChange, label, inputRef, ...otherProps } = props;

  const [checked, setChecked] = React.useState(false);

  const toggle = () => {
    setChecked(!checked);

    if (!!onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="pb-4">
      <label
        className={`w-full flex items-center mb-2 ${props.disabled ? "text-tandemDarkGray" : ""}`}
        style={{ height: "2.5rem" }}
      >
        <Checkbox
          checked={checked}
          onChange={toggle}
          ref={inputRef}
          {...otherProps}
          className="border-tandemMdGray border-b border-t-0 border-l-0 border-r-0 mr-2 leading-4 p-2"
        />
        {label}
      </label>
    </div>
  );
}
