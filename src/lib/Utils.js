export const ENGINEER_ROLE = "Development";
export const DESIGN_ROLE = "Design";
export const ENGAGEMENT_ROLE = "Growth";

export function displayName(person) {
  const lastNameDisplay = !!person.lastName ? `${person.lastName[0]}.` : "";
  return `${person.firstName} ${lastNameDisplay}`;
}

// sort staffed people first by department
// then by first name within department
// TODO: sort by end date?
export function defaultPeopleSort(people) {
  const clone = [...people];
  return [
    ...clone.filter((p) => isEngineer(p)).sort((a, b) => sortByName(a, b)),
    ...clone.filter((p) => isDesigner(p)).sort((a, b) => sortByName(a, b)),
    ...clone.filter((p) => isEngagementMgr(p)).sort((a, b) => sortByName(a, b)),
  ];
}

export function benchPeopleSort(people) {
  const clone = [...people];

  clone.sort((a, b) => {
    let sortNum;

    let aEnd = !!a.endDate ? a.endDate.getTime() : null;
    let bEnd = !!b.endDate ? b.endDate.getTime() : null;

    sortNum = !aEnd && !bEnd ? 0 : !aEnd ? 1 : -1;

    sortNum = aEnd > bEnd ? 1 : aEnd === bEnd ? 0 : -1;
    if (sortNum === 0) {
      let aNum = isEngineer(a) ? 0 : isDesigner(a) ? 1 : 2;
      let bNum = isEngineer(b) ? 0 : isDesigner(b) ? 1 : 2;

      sortNum = aNum - bNum;
    }
    if (sortNum === 0) {
      sortNum = sortByName(a, b);
    }

    return sortNum;
  });
  return clone;
}

export function isEngineer(person) {
  return isRole(person, ENGINEER_ROLE);
}

export function isDesigner(person) {
  return isRole(person, DESIGN_ROLE);
}

export function isEngagementMgr(person) {
  return isRole(person, ENGAGEMENT_ROLE);
}

export function isRole(person, role) {
  return person.roles && person.roles.length > 0 ? person.roles.includes(role) : false;
}

function sortByName(a, b) {
  return displayName(a) > displayName(b) ? 1 : -1;
}
