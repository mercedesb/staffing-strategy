import { defaultPeopleSort, benchPeopleSort } from "lib";
import { peopleFixture } from "fixtures";
import faker from "faker";

let people;

describe("Utils", () => {
  describe("defaultPeopleSort", () => {
    describe("when people are in different departments", () => {
      beforeEach(() => {
        people = [
          peopleFixture.build({ roles: ["Growth"] }),
          peopleFixture.build({ roles: ["Development"] }),
          peopleFixture.build({ roles: ["Design"] }),
        ];
      });

      it("sorts them in the correct order", () => {
        const expected = [people[1], people[2], people[0]];
        const actual = defaultPeopleSort(people);
        expect(actual).toEqual(expected);
      });
    });

    describe("when people are in the same department", () => {
      beforeEach(() => {
        people = [
          peopleFixture.build({ firstName: "Annika", lastName: "Nguyen", roles: ["Growth"] }),
          peopleFixture.build({ firstName: "Pedro", lastName: "Lopez", roles: ["Growth"] }),
          peopleFixture.build({ firstName: "Annika", lastName: "Cho", roles: ["Growth"] }),
        ];
      });

      it("sorts them in the correct order", () => {
        const expected = [people[2], people[0], people[1]];
        const actual = defaultPeopleSort(people);
        expect(actual).toEqual(expected);
      });
    });

    describe("when some people are in the same department", () => {
      beforeEach(() => {
        people = [
          peopleFixture.build({ firstName: "Annika", lastName: "Nguyen", roles: ["Design"] }),
          peopleFixture.build({ firstName: "Pedro", lastName: "Lopez", roles: ["Growth"] }),
          peopleFixture.build({ firstName: "Annika", lastName: "Cho", roles: ["Growth"] }),
        ];
      });

      it("sorts them in the correct order", () => {
        const expected = [people[0], people[2], people[1]];
        const actual = defaultPeopleSort(people);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe("benchPeopleSort", () => {
    describe("when everyone has a different endDate", () => {
      beforeEach(() => {
        people = [
          peopleFixture.build({ endDate: new Date(2020, 3, 3) }),
          peopleFixture.build({ endDate: new Date(2020, 2, 3) }),
          peopleFixture.build({ endDate: new Date(2020, 6, 6) }),
        ];
      });

      it("sorts them in the correct order", () => {
        const expected = [people[1], people[0], people[2]];
        const actual = benchPeopleSort(people);
        expect(actual).toEqual(expected);
      });
    });

    describe("when some people have the same endDate", () => {
      describe("when they're in different departements", () => {
        beforeEach(() => {
          people = [
            peopleFixture.build({ endDate: new Date(2020, 3, 3), roles: ["Design"] }),
            peopleFixture.build({ endDate: new Date(2020, 3, 3), roles: ["Development"] }),
            peopleFixture.build({ endDate: new Date(2020, 6, 6) }),
          ];
        });

        it("sorts them in the correct order", () => {
          const expected = [people[1], people[0], people[2]];
          const actual = benchPeopleSort(people);
          expect(actual).toEqual(expected);
        });
      });

      describe("when some people are in the same department", () => {
        describe("when they have different names", () => {
          beforeEach(() => {
            people = [
              peopleFixture.build({ endDate: new Date(2020, 3, 3), roles: ["Design"] }),
              peopleFixture.build({
                endDate: new Date(2020, 3, 3),
                roles: ["Development"],
                firstName: "Oliver",
                lastName: "Abubakar",
              }),
              peopleFixture.build({
                endDate: new Date(2020, 3, 3),
                roles: ["Development"],
                firstName: "Monika",
                lastName: "Petrova",
              }),
            ];
          });
          it("sorts them in the correct order", () => {
            const expected = [people[2], people[1], people[0]];
            const actual = benchPeopleSort(people);
            expect(actual).toEqual(expected);
          });
        });

        describe("when they have similar names", () => {
          beforeEach(() => {
            people = [
              peopleFixture.build({ endDate: new Date(2020, 3, 3), roles: ["Design"] }),
              peopleFixture.build({
                endDate: new Date(2020, 3, 3),
                roles: ["Development"],
                firstName: "Chris",
                lastName: "Smith",
              }),
              peopleFixture.build({
                endDate: new Date(2020, 3, 3),
                roles: ["Development"],
                firstName: "Chris",
                lastName: "Peterson",
              }),
            ];
          });

          it("sorts them in the correct order", () => {
            const expected = [people[2], people[1], people[0]];
            const actual = benchPeopleSort(people);
            expect(actual).toEqual(expected);
          });
        });
      });
    });
  });
});
