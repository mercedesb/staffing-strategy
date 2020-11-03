import faker from "faker";
import { randomInteger } from "lib";

const ROLES = ["Development", "Design", "Growth"];

const build = (attributes, i) => {
  const index = i !== null && i !== undefined ? i : 1;
  return {
    id: `person-${index}`,
    roles: [ROLES[randomInteger(0, 2)]],
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    ...attributes,
  };
};

const buildList = (amount, attributes) => {
  let parsedAttributes = attributes || {};
  const list = [];
  for (var i = 0; i < amount; i++) {
    list.push(build(parsedAttributes, i));
  }
  return list;
};

export default { build, buildList };
