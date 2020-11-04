import { TimelineGrouper } from "lib";
import { complexScenarioFixture } from "fixtures";

let scenarios;
let timelineStart;
let timelineEnd;
let people = [
  {
    id: "825293",
    first_name: "Eileen",
    last_name: "Duffner",
    archived: false,
    roles: ["Billable", "Chicago", "Development", "Employee"],
    weekly_capacity: 144000,
    firstName: "Eileen",
    lastName: "Duffner",
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
  },
];

describe("TimelineGrouper", () => {
  beforeEach(() => {
    scenarios = [complexScenarioFixture];
    timelineStart = new Date(2020, 9, 30);
    timelineEnd = new Date(2021, 3, 30);
  });

  it("returns an array", () => {
    const actual = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
    expect(actual).toBeInstanceOf(Array);
  });

  it("returns the first item as the scenario's group", () => {
    const actual = TimelineGrouper(scenarios, people, timelineStart, timelineEnd)[0];
    expect(actual).toBeInstanceOf(Object);
    expect(actual).toEqual(
      expect.objectContaining({
        id: complexScenarioFixture.id,
        title: complexScenarioFixture.title,
        rightTitle: complexScenarioFixture.title,
        height: 50,
        root: true,
        parent: null,
        backgroundColor: expect.any(String),
        fontColor: expect.any(String),
        startDate: new Date(2020, 4, 4),
        endDate: new Date(2021, 3, 30),
        treeLevel: 0,
      })
    );
  });

  it("returns the second item as the first project's group", () => {
    const actual = TimelineGrouper(scenarios, people, timelineStart, timelineEnd)[1];
    expect(actual).toBeInstanceOf(Object);

    const project = complexScenarioFixture.projects[0];

    expect(actual).toEqual(
      expect.objectContaining({
        id: `${complexScenarioFixture.id}-${project.id}`,
        title: project.name,
        rightTitle: project.name,
        height: 50,
        root: true,
        parent: complexScenarioFixture.id,
        backgroundColor: expect.any(String),
        fontColor: expect.any(String),
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2021, 0, 1),
        treeLevel: 1,
      })
    );
  });

  it("returns the third item as the first project's first person's group", () => {
    const actual = TimelineGrouper(scenarios, people, timelineStart, timelineEnd)[2];
    expect(actual).toBeInstanceOf(Object);

    const project = complexScenarioFixture.projects[0];
    const person = project.people[0];

    expect(actual).toEqual(
      expect.objectContaining({
        id: `${complexScenarioFixture.id}-${project.id}-${person.id}`,
        title: `${person.firstName} ${person.lastName[0]}.`,
        rightTitle: `${person.firstName} ${person.lastName[0]}.`,
        root: false,
        parent: `${complexScenarioFixture.id}-${project.id}`,
        backgroundColor: expect.any(String),
        fontColor: expect.any(String),
        startDate: new Date("2020-09-21T05:00:00.000Z"),
        endDate: new Date("2020-12-31T06:00:00.000Z"),
        treeLevel: 2,
        roles: person.roles,
        firstName: person.firstName,
      })
    );
  });

  it("returns a project group after all of the previous project's people groups", () => {
    const groups = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
    const firstProject = complexScenarioFixture.projects[0];
    const person = firstProject.people[firstProject.people.length - 1];

    const lastPersonIndex = groups.findIndex(
      (g) => g.id === `${complexScenarioFixture.id}-${firstProject.id}-${person.id}`
    );
    const actual = groups[lastPersonIndex + 1];

    const secondProject = complexScenarioFixture.projects[1];

    expect(actual).toEqual(
      expect.objectContaining({
        id: `${complexScenarioFixture.id}-${secondProject.id}`,
        title: secondProject.name,
        rightTitle: secondProject.name,
        height: 50,
        root: true,
        parent: complexScenarioFixture.id,
        backgroundColor: expect.any(String),
        fontColor: expect.any(String),
        startDate: new Date("2020-04-06T05:00:00.000Z"),
        endDate: new Date("2020-12-31T06:00:00.000Z"),
        treeLevel: 1,
      })
    );
  });

  it("returns one group for a person if they have multiple contiguous assignments", () => {
    const groups = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);

    const project = complexScenarioFixture.projects[0];
    const personWithMultipleAssignments = project.people.find((p) => p.id === "826568");

    const actual = groups.filter(
      (g) => g.id === `${complexScenarioFixture.id}-${project.id}-${personWithMultipleAssignments.id}`
    );
    expect(actual.length).toEqual(1);
  });

  // it("returns multiple groups for a person if they have multiple separate assignments", () => {});

  // BENCH LOGIC

  describe("bench logic", () => {
    it("returns the last project group as the Bench", () => {
      const groups = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
      const projectGroups = groups.filter((g) => g.treeLevel === 1);

      const actual = projectGroups[projectGroups.length - 1];

      expect(actual).toEqual(
        expect.objectContaining({
          id: `Bench-${complexScenarioFixture.id}`,
          title: "Bench",
          rightTitle: "Bench",
          height: 50,
          root: true,
          parent: complexScenarioFixture.id,
          backgroundColor: expect.any(String),
          fontColor: expect.any(String),
          startDate: new Date("2020-01-01T06:00:00.000Z"),
          endDate: timelineEnd,
          treeLevel: 1,
        })
      );
    });

    it("returns one group for each person in the company who has Bench time in the next 6 months", () => {
      const groups = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
      const projectGroups = groups.filter((g) => g.treeLevel === 1);

      const benchProject = projectGroups[projectGroups.length - 1];
      const benchProjectIndex = groups.findIndex((g) => g.id === benchProject.id);

      const benchPeopleGroups = groups.slice(benchProjectIndex + 1);

      const benchPeopleIds = benchPeopleGroups.map((g) => g.id);
      expect(benchPeopleIds.length).toEqual([...new Set(benchPeopleIds)].length);
    });

    // describe("when someone is staffed on multiple projects", () => {});

    it("sorts the bench people correctly", () => {
      const groups = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
      const projectGroups = groups.filter((g) => g.treeLevel === 1);

      const benchProject = projectGroups[projectGroups.length - 1];
      const benchProjectIndex = groups.findIndex((g) => g.id === benchProject.id);

      const actual = groups.slice(benchProjectIndex + 1);

      // sort by end date
      // sort by department
      // sort name
      const expectedPeople = [
        people.find((p) => p.id === "397801"), // Elizabeth (12/4),
        people.find((p) => p.id === "861810"), // Cain, (12/31)
        people.find((p) => p.id === "412515"), // Gwen, (12/31)
        people.find((p) => p.id === "185189"), // Sasha, (12/31)
        people.find((p) => p.id === "825293"), // Eileen (3/31),
        people.find((p) => p.id === "519191"), // Kate, (11/30) (3/31)
        people.find((p) => p.id === "861022"), // Mia (3/31),
        people.find((p) => p.id === "837718"), // Jewel (3/31),
        people.find((p) => p.id === "826568"), // McKenzie, (12/25) (3/31)
        people.find((p) => p.id === "815382"), // Chris T (3/31),
        people.find((p) => p.id === "841320"), // Darcy (1/20) (4/30),
      ];

      const expected = expectedPeople.map((p) => ({
        id: `Bench-${scenarios[0].id}-${p.id}`,
        title: `${p.firstName} ${p.lastName[0]}.`,
        rightTitle: `${p.firstName} ${p.lastName[0]}.`,
        root: false,
        parent: `Bench-${scenarios[0].id}`,
        startDate: new Date(2020, 10, 30),
        endDate: new Date(2021, 0, 1),
        treeLevel: 2,
      }));

      actual.forEach((a, index) => {
        expect(a).toEqual(expect.objectContaining(expected[index]));
      });
    });

    // describe("when someone has no assignments", () => {
    //   it("sets them on the bench from the start of the timeline", () => {

    //   })
    // })
  });
});
