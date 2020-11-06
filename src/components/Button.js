import React from "react";
import { Button as ReakitButton } from "reakit/Button";

export function Button(props) {
  const { primary, secondary } = props;

  let className = `${props.className} py-4 px-8 border-4 `;
  if (primary) {
    className += "bg-inspiringIndigo border-inspiringIndigo text-tandemGray hover:bg-breakthroughBlue ";
  } else if (secondary) {
    className +=
      "bg-tandemGray border-inspiringIndigo text-inspiringIndigo hover:bg-inspiringIndigo hover:text-tandemGray ";
  }

  return (
    <ReakitButton {...props} className={className} style={{ height: "60px", minWidth: "185px" }}>
      <span className="w-full text-center">{props.children}</span>
    </ReakitButton>
  );
}
