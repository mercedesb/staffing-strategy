import { TimelineGrouper, displayName } from "lib";
import { complexScenarioFixture } from "fixtures";

let scenarios;
let timelineStart;
let timelineEnd;
let people = [
  {
    id: "825293",
    firstName: "Eileen",
    lastName: "Duffner",
    roles: ["Billable", "Chicago", "Development", "Employee"],
  },
  {
    id: "519191",
    firstName: "Kate",
    lastName: "Donaldson",
    roles: ["Billable", "Chicago", "Development", "Employee", "Management"],
  },
  {
    id: "861022",
    firstName: "Mia",
    lastName: "Frank",
    roles: ["Billable", "Development", "Employee"],
  },
  {
    id: "837718",
    firstName: "Jewel",
    lastName: "Tolbert",
    roles: ["Billable", "Design", "Employee", "Chicago"],
  },
  {
    id: "826568",
    firstName: "McKenzie",
    lastName: "Landorf",
    roles: ["Billable", "Chicago", "Design", "Employee"],
  },
  {
    id: "815382",
    firstName: "Chris",
    lastName: "Tretola",
    roles: ["Product & Engagement Management", "Billable", "Chicago", "Employee", "Growth"],
  },
  {
    id: "841320",
    firstName: "Darcy",
    lastName: "Garrett",
    roles: ["Billable", "Development", "Chicago", "Contractor"],
  },
  {
    id: "397801",
    firstName: "Elizabeth",
    lastName: "Coleman",
    roles: ["Billable", "Chicago", "Design", "Employee"],
  },
  {
    id: "185189",
    firstName: "Sasha",
    lastName: "Grodzins",
    roles: ["Billable", "Development", "Employee", "Chicago", "Lead"],
  },
  {
    id: "861810",
    firstName: "Cain",
    lastName: "Watson",
    roles: ["Billable", "Development", "Employee"],
  },
  {
    id: "412515",
    firstName: "Gwen",
    lastName: "Smuda",
    roles: ["Billable", "Chicago", "Development", "Employee", "Lead", "Strategy"],
  },
  {
    id: "412516",
    firstName: "Eli",
    lastName: "Sidman",
    roles: ["Billable", "Chicago", "Design", "Employee"],
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

  it("returns the first item as an addable new scenario", () => {
    const items = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
    const actual = items[0];
    expect(actual).toBeInstanceOf(Object);

    expect(actual).toEqual(
      expect.objectContaining({
        id: "NewScenario",
        title: "New Scenario",
        height: 50,
        root: false,
        parent: null,
        backgroundColor: expect.any(String),
        fontColor: expect.any(String),
        startDate: null,
        endDate: null,
        treeLevel: 0,
        addable: true,
      })
    );
  });

  it("returns the second item as the scenario's group", () => {
    const items = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
    const actual = items[1];
    expect(actual).toBeInstanceOf(Object);

    expect(actual).toEqual(
      expect.objectContaining({
        id: complexScenarioFixture.id,
        title: complexScenarioFixture.title,
        height: 50,
        root: true,
        parent: null,
        backgroundColor: expect.any(String),
        fontColor: expect.any(String),
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2021, 3, 30),
        treeLevel: 0,
      })
    );
  });

  it("returns the third item as an addable new project", () => {
    const items = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
    const actual = items[2];
    expect(actual).toBeInstanceOf(Object);

    expect(actual).toEqual(
      expect.objectContaining({
        id: `NewProject-${complexScenarioFixture.id}`,
        title: "New Project",
        height: 50,
        root: false,
        parent: complexScenarioFixture.id,
        backgroundColor: expect.any(String),
        fontColor: expect.any(String),
        startDate: null,
        endDate: null,
        treeLevel: 1,
        addable: true,
      })
    );
  });

  it("returns the fourth item as the first project's group", () => {
    const actual = TimelineGrouper(scenarios, people, timelineStart, timelineEnd)[3];
    expect(actual).toBeInstanceOf(Object);

    const project = complexScenarioFixture.projects[0];

    expect(actual).toEqual(
      expect.objectContaining({
        id: `${complexScenarioFixture.id}-${project.id}`,
        title: project.name,
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

  it("returns the fifth item as an addable new person", () => {
    const items = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
    const actual = items[4];
    expect(actual).toBeInstanceOf(Object);

    const project = complexScenarioFixture.projects[0];

    expect(actual).toEqual(
      expect.objectContaining({
        id: `NewPerson-${complexScenarioFixture.id}-${project.id}`,
        title: "New Person",
        height: 50,
        root: false,
        parent: `${complexScenarioFixture.id}-${project.id}`,
        startDate: null,
        endDate: null,
        treeLevel: 2,
        addable: true,
      })
    );
  });

  it("returns the sixth item as the first project's first person's group", () => {
    const actual = TimelineGrouper(scenarios, people, timelineStart, timelineEnd)[5];
    expect(actual).toBeInstanceOf(Object);

    const project = complexScenarioFixture.projects[0];
    const person = project.people[0];

    expect(actual).toEqual(
      expect.objectContaining({
        id: `${complexScenarioFixture.id}-${project.id}-${person.id}`,
        title: displayName(person),
        root: false,
        parent: `${complexScenarioFixture.id}-${project.id}`,
        backgroundColor: expect.any(String),
        fontColor: expect.any(String),
        startDate: new Date("2020-09-21T05:00:00.000Z"),
        endDate: new Date("2020-12-31T06:00:00.000Z"),
        treeLevel: 2,
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
    let benchPeopleGroups;

    beforeEach(() => {
      const groups = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
      const projectGroups = groups.filter((g) => g.treeLevel === 1);

      const benchProject = projectGroups[projectGroups.length - 1];
      const benchProjectIndex = groups.findIndex((g) => g.id === benchProject.id);

      benchPeopleGroups = groups.slice(benchProjectIndex + 1);
    });

    it("returns the last project group as the Bench", () => {
      const groups = TimelineGrouper(scenarios, people, timelineStart, timelineEnd);
      const projectGroups = groups.filter((g) => g.treeLevel === 1);

      const actual = projectGroups[projectGroups.length - 1];

      expect(actual).toEqual(
        expect.objectContaining({
          id: `Bench-${complexScenarioFixture.id}`,
          title: "Bench",
          height: 50,
          root: true,
          parent: complexScenarioFixture.id,
          backgroundColor: expect.any(String),
          fontColor: expect.any(String),
          startDate: new Date(2020, 9, 30),
          endDate: timelineEnd,
          treeLevel: 1,
        })
      );
    });

    it("returns one group for each person in the company who has Bench time in the next 6 months", () => {
      const benchPeopleIds = benchPeopleGroups.map((g) => g.id);
      expect(benchPeopleIds.length).toEqual([...new Set(benchPeopleIds)].length);
    });

    // describe("when someone is staffed on multiple projects", () => {});

    it("sorts the bench people correctly", () => {
      const actual = benchPeopleGroups;

      // sort by end date
      // sort by department
      // sort name
      const expectedPeople = [
        people.find((p) => p.id === "412516"), // Eli (timelineStart),
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
        title: displayName(p),
        root: false,
        parent: `Bench-${scenarios[0].id}`,
        treeLevel: 2,
      }));

      actual.forEach((a, index) => {
        expect(a).toEqual(expect.objectContaining(expected[index]));
      });
    });

    describe("when someone has no assignments", () => {
      it("sets them on the bench from the start of the timeline", () => {
        const actual = benchPeopleGroups[0];
        expect(actual.startDate).toEqual(timelineStart);
      });
    });
  });
});
