import React from "react";

import { IconChevronDown, IconChevronUp, IconPencil, IconPlus } from "tabler-icons";

import { ButtonWithIcon, Modal } from "components";
import { AddScenario } from "../Forms/AddScenario";
import { EditScenario } from "../Forms/EditScenario";
import { AddProject } from "../Forms/AddProject";
import { EditProject } from "../Forms/EditProject";
import { AddPerson } from "../Forms/AddPerson";
import { EditPerson } from "../Forms/EditPerson";

import tailwindConfig from "../../tailwind";
const { theme } = tailwindConfig;
const { colors } = theme;

export function TimelineGroup({ group, openGroups, toggleGroup }) {
  const renderAddForm = (closeModal) => {
    switch (group.type) {
      case "scenario":
        return <AddScenario closeModal={closeModal} />;
      case "project":
        return <AddProject scenarioId={group.id.split("-")[1]} closeModal={closeModal} />;
      case "person":
        return (
          <AddPerson scenarioId={group.id.split("-")[1]} projectId={group.id.split("-")[2]} closeModal={closeModal} />
        );
      default:
        return null;
    }
  };

  const renderEditForm = (closeModal) => {
    switch (group.type) {
      case "scenario":
        return <EditScenario scenario={{ ...group.scenario }} deletable={group.deletable} closeModal={closeModal} />;
      case "project":
        return <EditProject project={{ ...group.project }} deletable={group.deletable} closeModal={closeModal} />;
      case "person":
        return <EditPerson person={{ ...group.person }} deletable={group.deletable} closeModal={closeModal} />;
      default:
        return null;
    }
  };

  const renderAddableGroup = () => {
    return (
      <Modal
        linkText={
          <>
            <IconPlus color={colors.breakthroughBlue} /> {group.title}
          </>
        }
        modalLabel={`Add ${group.title}`}
      >
        {(closeModal) => renderAddForm(closeModal)}
      </Modal>
    );
  };

  const renderExpandableGroup = () => {
    return (
      <div className="flex items-center justify-between">
        <ButtonWithIcon onClick={() => toggleGroup(group.id, group)} className="noBtn">
          {openGroups[group.id] ? (
            <IconChevronUp color={colors.breakthroughBlue} />
          ) : (
            <IconChevronDown color={colors.breakthroughBlue} />
          )}{" "}
          {group.title}
        </ButtonWithIcon>
        <div className="w-auto">
          {group.editable && (
            <Modal linkText={<IconPencil color={colors.growingGreen} />} modalLabel={`Edit ${group.title}`}>
              {(closeModal) => {
                return renderEditForm(closeModal);
              }}
            </Modal>
          )}
        </div>
      </div>
    );
  };

  const renderDefaultGroup = () => {
    return (
      <div className="flex items-center justify-between">
        {group.title}
        <div className="w-auto">
          {group.editable && (
            <Modal
              linkText={<IconPencil color={colors.growingGreen} stroke="1px" />}
              modalLabel={`Edit ${group.title}`}
            >
              {(closeModal) => renderEditForm(closeModal)}
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
    return <div className={className}>{renderDefaultGroup()}</div>;
  }
}
