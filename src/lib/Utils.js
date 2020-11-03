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
    let sortNum = a.endDate > b.endDate ? 1 : a.endDate === b.endDate ? 0 : -1;

    if (sortNum === 0) {
      let aNum = isEngineer(a) ? 0 : isDesigner(a) ? 1 : 2;
      let bNum = isEngineer(b) ? 0 : isDesigner(b) ? 1 : 2;

      sortNum = aNum - bNum;
    }

    if (sortNum === 0) {
      sortNum = a.rightTitle > b.rightTitle ? 1 : -1;
    }

    return sortNum;
  });
  return clone;
}

function isEngineer(person) {
  return person.roles.includes("Development");
}

function isDesigner(person) {
  return person.roles.includes("Design");
}

function isEngagementMgr(person) {
  return person.roles.includes("Growth");
}

function sortByName(personA, personB) {
  let personADisplayName = `${personA.firstName} ${personA.lastName[0]}.`;
  let personBDisplayName = `${personB.firstName} ${personB.lastName[0]}.`;

  return personADisplayName > personBDisplayName ? 1 : -1;
}
