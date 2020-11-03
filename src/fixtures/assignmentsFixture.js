import faker from "faker";

const build = (attributes, i) => {
  const index = i !== null && i !== undefined ? i : 1;
  return {
    id: `assignment-${index}`,
    projectId: `project-${index}`,
    personId: `person-${index}`,
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    ...attributes,
  };
};

const buildList = (amount, attributes, startIndex = 0) => {
  let parsedAttributes = attributes || {};
  const list = [];
  for (var i = 0; i < amount; i++) {
    let index = i + startIndex;
    list.push(build(parsedAttributes, index));
  }
  return list;
};

export default { build, buildList };
