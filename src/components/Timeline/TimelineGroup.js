import React from "react";

import { IconChevronDown, IconChevronUp, IconPencil, IconPlus } from "tabler-icons";

import { ButtonWithIcon, Modal } from "components";
import { AddScenario } from "../Forms/AddScenario";
import { EditScenario } from "../Forms/EditScenario";
import { AddProject } from "../Forms/AddProject";
import { EditProject } from "../Forms/EditProject";
import { AddPerson } from "../Forms/AddPerson";

export function TimelineGroup({ group, openGroups, toggleGroup }) {
  const renderAddForm = () => {
    switch (group.type) {
      case "scenario":
        return <AddScenario />;
      case "project":
        return <AddProject scenarioId={group.id.split("-")[1]} />;
      case "person":
        return <AddPerson scenarioId={group.id.split("-")[1]} projectId={group.id.split("-")[2]} />;
      default:
        return null;
    }
  };

  const renderEditForm = () => {
    switch (group.type) {
      case "scenario":
        return <EditScenario scenario={{ ...group.scenario }} deletable={group.deletable} />;
      case "project":
        return (
          <EditProject project={{ ...group.project }} deletable={group.deletable} scenarioId={group.id.split("-")[1]} />
        );
      case "person":
        return (
          <AddPerson
            deletable={group.deletable}
            scenarioId={group.id.split("-")[1]}
            projectId={group.id.split("-")[2]}
          />
        );
      default:
        return null;
    }
  };

  const renderAddableGroup = () => {
    return (
      <Modal
        linkText={
          <>
            <IconPlus /> {group.title}
          </>
        }
        modalLabel={`Add ${group.title}`}
      >
        {renderAddForm()}
      </Modal>
    );
  };

  const renderExpandableGroup = () => {
    return (
      <div className="flex items-center justify-between">
        <ButtonWithIcon onClick={() => toggleGroup(group.id, group)} className="noBtn">
          {openGroups[group.id] ? <IconChevronUp /> : <IconChevronDown />} {group.title}
        </ButtonWithIcon>
        <div className="w-auto">
          {group.editable && (
            <Modal linkText={<IconPencil />} modalLabel={`Edit ${group.title}`}>
              {renderEditForm()}
            </Modal>
          )}
        </div>
      </div>
    );
  };

  let className = "w-full ";
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
