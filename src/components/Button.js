import React from "react";
import { Button as ReakitButton } from "reakit/Button";

export function Button(props) {
  const { primary, secondary, className, children, ...otherProps } = props;

  let buttonClassName = `${className} py-4 px-8 border-4 `;
  if (primary) {
    buttonClassName += "bg-inspiringIndigo border-inspiringIndigo text-tandemGray hover:bg-breakthroughBlue ";
  } else if (secondary) {
    buttonClassName +=
      "bg-tandemGray border-inspiringIndigo text-inspiringIndigo hover:bg-inspiringIndigo hover:text-tandemGray ";
  }

  return (
    <ReakitButton {...otherProps} className={buttonClassName} style={{ height: "60px", minWidth: "185px" }}>
      <span className="w-full text-center">{children}</span>
    </ReakitButton>
  );
}
