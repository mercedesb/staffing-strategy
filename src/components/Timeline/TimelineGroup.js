import React from "react";

import { IconChevronDown, IconChevronUp, IconPencil, IconPlus } from "tabler-icons";

import { ButtonWithIcon, Modal } from "components";
import { AddPerson, EditPerson } from "components/Person";
import { AddProject, EditProject } from "components/Project";
import { AddScenario, EditScenario } from "components/Scenario";

export function TimelineGroup({ group, openGroups, toggleGroup }) {
  const renderAddForm = (closeModal, initialFocusRef) => {
    switch (group.type) {
      case "scenario":
        return <AddScenario closeModal={closeModal} initialFocusRef={initialFocusRef} />;
      case "project":
        return (
          <AddProject scenarioId={group.id.split("-")[1]} closeModal={closeModal} initialFocusRef={initialFocusRef} />
        );
      case "person":
        return (
          <AddPerson
            scenarioId={group.id.split("-")[1]}
            projectId={group.id.split("-")[2]}
            closeModal={closeModal}
            initialFocusRef={initialFocusRef}
          />
        );
      default:
        return null;
    }
  };

  const renderEditForm = (closeModal, initialFocusRef) => {
    switch (group.type) {
      case "scenario":
        return (
          <EditScenario
            scenario={{ ...group.scenario }}
            deletable={group.deletable}
            closeModal={closeModal}
            initialFocusRef={initialFocusRef}
          />
        );
      case "project":
        return (
          <EditProject
            scenarioId={group.id.split("-")[1]}
            project={{ ...group.project }}
            deletable={group.deletable}
            closeModal={closeModal}
            initialFocusRef={initialFocusRef}
          />
        );
      case "person":
        return (
          <EditPerson
            person={{ ...group.person }}
            deletable={group.deletable}
            closeModal={closeModal}
            initialFocusRef={initialFocusRef}
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
            <IconPlus className="text-breakthroughBlue" /> {group.title}
          </>
        }
        modalLabel={`Add ${group.title}`}
      >
        {(closeModal, initialFocusRef) => renderAddForm(closeModal, initialFocusRef)}
      </Modal>
    );
  };

  const renderExpandableGroup = () => {
    return (
      <div className="flex items-center justify-between">
        <ButtonWithIcon onClick={() => toggleGroup(group.id, group)} className="noBtn">
          {openGroups[group.id] ? (
            <IconChevronUp className="text-breakthroughBlue" />
          ) : (
            <IconChevronDown className="text-breakthroughBlue" />
          )}{" "}
          <span
            className="text-left"
            style={{
              width: "150px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {group.title}
          </span>
        </ButtonWithIcon>
        <div className="w-auto">
          {group.editable && (
            <Modal linkText={<IconPencil className="text-growingGreen" />} modalLabel={`Edit ${group.title}`}>
              {(closeModal, initialFocusRef) => {
                return renderEditForm(closeModal, initialFocusRef);
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
            <Modal linkText={<IconPencil className="text-growingGreen" />} modalLabel={`Edit ${group.title}`}>
              {(closeModal, initialFocusRef) => renderEditForm(closeModal, initialFocusRef)}
            </Modal>
          )}
        </div>
      </div>
    );
  };

  let className = "w-full ";
  if (group.treeLevel === 1) className += "pl-4";
  else if (group.treeLevel === 2) className += "pl-8";

  if (group.root) {
    return <div className={className}>{renderExpandableGroup()}</div>;
  } else if (group.addable) {
    return <div className={className}>{renderAddableGroup()}</div>;
  } else {
    return <div className={className}>{renderDefaultGroup()}</div>;
  }
}
