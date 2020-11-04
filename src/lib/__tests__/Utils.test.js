import { defaultPeopleSort, benchPeopleSort } from "lib";
import { peopleFixture } from "fixtures";

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

    describe("complex sorting", () => {
      beforeEach(() => {
        people = [
          {
            id: "815382",
            first_name: "Chris",
            last_name: "Tretola",
            archived: false,
            roles: ["Product & Engagement Management", "Billable", "Chicago", "Employee", "Growth"],
            weekly_capacity: 144000,
            firstName: "Chris",
            lastName: "Tretola",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
          {
            id: "861810",
            first_name: "Cain",
            last_name: "Watson",
            archived: false,
            roles: ["Billable", "Development", "Employee"],
            weekly_capacity: 144000,
            firstName: "Cain",
            lastName: "Watson",
            endDate: new Date("2020-12-31T06:00:00.000Z"),
          },
          {
            id: "825293",
            first_name: "Eileen",
            last_name: "Duffner",
            archived: false,
            roles: ["Billable", "Chicago", "Development", "Employee"],
            weekly_capacity: 144000,
            firstName: "Eileen",
            lastName: "Duffner",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
          {
            id: "826568",
            first_name: "McKenzie",
            last_name: "Landorf",
            archived: false,
            roles: ["Billable", "Chicago", "Design", "Employee"],
            weekly_capacity: 144000,
            firstName: "McKenzie",
            lastName: "Landorf",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
          {
            id: "861022",
            first_name: "Mia",
            last_name: "Frank",
            archived: false,
            roles: ["Billable", "Development", "Employee"],
            weekly_capacity: 144000,
            firstName: "Mia",
            lastName: "Frank",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
          {
            id: "837718",
            first_name: "Jewel",
            last_name: "Tolbert",
            archived: false,
            roles: ["Billable", "Design", "Employee", "Chicago"],
            weekly_capacity: 144000,
            firstName: "Jewel",
            lastName: "Tolbert",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
          {
            id: "841320",
            first_name: "Darcy",
            last_name: "Garrett",
            archived: false,
            roles: ["Billable", "Development", "Chicago", "Contractor"],
            weekly_capacity: 144000,
            firstName: "Darcy",
            lastName: "Garrett",
            endDate: new Date("2021-04-30T05:00:00.000Z"),
          },
          {
            id: "397801",
            first_name: "Elizabeth",
            last_name: "Coleman",
            archived: false,
            roles: ["Billable", "Chicago", "Design", "Employee"],
            weekly_capacity: 144000,
            firstName: "Elizabeth",
            lastName: "Coleman",
            endDate: new Date("2020-12-04T06:00:00.000Z"),
          },
          {
            id: "185189",
            first_name: "Sasha",
            last_name: "Grodzins",
            archived: false,
            roles: ["Billable", "Development", "Employee", "Chicago", "Lead"],
            weekly_capacity: 144000,
            firstName: "Sasha",
            lastName: "Grodzins",
            endDate: new Date("2020-12-31T06:00:00.000Z"),
          },
          {
            id: "412515",
            first_name: "Gwen",
            last_name: "Smuda",
            archived: false,
            roles: ["Billable", "Chicago", "Development", "Employee", "Lead", "Strategy"],
            weekly_capacity: 144000,
            firstName: "Gwen",
            lastName: "Smuda",
            endDate: new Date("2020-12-31T06:00:00.000Z"),
          },
          {
            id: "519191",
            first_name: "Kate",
            last_name: "Donaldson",
            archived: false,
            roles: ["Billable", "Chicago", "Development", "Employee", "Management"],
            weekly_capacity: 144000,
            firstName: "Kate",
            lastName: "Donaldson",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
        ];
      });

      it("sorts them in the correct order", () => {
        const expected = (people = [
          {
            id: "397801",
            first_name: "Elizabeth",
            last_name: "Coleman",
            archived: false,
            roles: ["Billable", "Chicago", "Design", "Employee"],
            weekly_capacity: 144000,
            firstName: "Elizabeth",
            lastName: "Coleman",
            endDate: new Date("2020-12-04T06:00:00.000Z"),
          },
          {
            id: "861810",
            first_name: "Cain",
            last_name: "Watson",
            archived: false,
            roles: ["Billable", "Development", "Employee"],
            weekly_capacity: 144000,
            firstName: "Cain",
            lastName: "Watson",
            endDate: new Date("2020-12-31T06:00:00.000Z"),
          },
          {
            id: "412515",
            first_name: "Gwen",
            last_name: "Smuda",
            archived: false,
            roles: ["Billable", "Chicago", "Development", "Employee", "Lead", "Strategy"],
            weekly_capacity: 144000,
            firstName: "Gwen",
            lastName: "Smuda",
            endDate: new Date("2020-12-31T06:00:00.000Z"),
          },

          {
            id: "185189",
            first_name: "Sasha",
            last_name: "Grodzins",
            archived: false,
            roles: ["Billable", "Development", "Employee", "Chicago", "Lead"],
            weekly_capacity: 144000,
            firstName: "Sasha",
            lastName: "Grodzins",
            endDate: new Date("2020-12-31T06:00:00.000Z"),
          },
          {
            id: "825293",
            first_name: "Eileen",
            last_name: "Duffner",
            archived: false,
            roles: ["Billable", "Chicago", "Development", "Employee"],
            weekly_capacity: 144000,
            firstName: "Eileen",
            lastName: "Duffner",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
          {
            id: "519191",
            first_name: "Kate",
            last_name: "Donaldson",
            archived: false,
            roles: ["Billable", "Chicago", "Development", "Employee", "Management"],
            weekly_capacity: 144000,
            firstName: "Kate",
            lastName: "Donaldson",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
          {
            id: "861022",
            first_name: "Mia",
            last_name: "Frank",
            archived: false,
            roles: ["Billable", "Development", "Employee"],
            weekly_capacity: 144000,
            firstName: "Mia",
            lastName: "Frank",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
          {
            id: "837718",
            first_name: "Jewel",
            last_name: "Tolbert",
            archived: false,
            roles: ["Billable", "Design", "Employee", "Chicago"],
            weekly_capacity: 144000,
            firstName: "Jewel",
            lastName: "Tolbert",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
          {
            id: "826568",
            first_name: "McKenzie",
            last_name: "Landorf",
            archived: false,
            roles: ["Billable", "Chicago", "Design", "Employee"],
            weekly_capacity: 144000,
            firstName: "McKenzie",
            lastName: "Landorf",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },
          {
            id: "815382",
            first_name: "Chris",
            last_name: "Tretola",
            archived: false,
            roles: ["Product & Engagement Management", "Billable", "Chicago", "Employee", "Growth"],
            weekly_capacity: 144000,
            firstName: "Chris",
            lastName: "Tretola",
            endDate: new Date("2021-03-31T05:00:00.000Z"),
          },

          {
            id: "841320",
            first_name: "Darcy",
            last_name: "Garrett",
            archived: false,
            roles: ["Billable", "Development", "Chicago", "Contractor"],
            weekly_capacity: 144000,
            firstName: "Darcy",
            lastName: "Garrett",
            endDate: new Date("2021-04-30T05:00:00.000Z"),
          },
        ]);

        const actual = benchPeopleSort(people);
        expect(actual).toEqual(expected);
      });
    });
  });
});
