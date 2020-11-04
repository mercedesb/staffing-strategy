import React, { useState } from "react";
import { useAirtable } from "hooks";
import { IconChevronDown, IconChevronUp, IconCirclePlus } from "tabler-icons";

import { ScenariosContext } from "contexts";
import { ButtonWithIcon } from "components";

export function TimelineGroup({ timelineGroup, openGroups, toggleGroup }) {
  const { fetchScenarios } = React.useContext(ScenariosContext);
  const { createScenario } = useAirtable();
  const [showInput, setShowInput] = useState(false);
  const [newGroup, setNewGroup] = useState("");
  const { group } = timelineGroup;

  const handleAdd = async () => {
    switch (group.addable) {
      case "scenario":
        let data = { name: newGroup };
        await createScenario(data);
        fetchScenarios();
        break;
      case "project":
        break;
      case "person":
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (e) => {
    // We pass the new value of the text when calling onAccept
    if (e.key === "Enter") {
      handleAdd();
      setShowInput(false);
    }
  };

  const renderExpandableGroup = () => {
    return (
      <ButtonWithIcon onClick={() => toggleGroup(group.id)} className="noBtn">
        {openGroups[group.id] ? <IconChevronUp /> : <IconChevronDown />} {group.title}
      </ButtonWithIcon>
    );
  };

  const renderAddableGroup = () => {
    if (showInput) {
      return (
        <input
          type="text"
          className="border border-blue-500 leading-4 p-2 w-full"
          onChange={(e) => setNewGroup(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
      );
    } else {
      return (
        <ButtonWithIcon onClick={() => setShowInput(true)} className="noBtn ml-4">
          <IconCirclePlus /> {group.title}
        </ButtonWithIcon>
      );
    }
  };

  let className = "";
  if (group.treeLevel === 1) className += "ml-4";
  else if (group.treeLevel === 2) className += "ml-8";

  if (group.root) {
    return <div className={className}>{renderExpandableGroup()}</div>;
  } else if (group.addable) {
    return <div className={className}>{renderAddableGroup()}</div>;
  } else {
    return <div className={className}>{group.title}</div>;
  }
}
