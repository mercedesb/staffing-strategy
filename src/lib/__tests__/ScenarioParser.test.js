import { ScenarioParser, defaultPeopleSort, ENGINEER_ROLE, DESIGN_ROLE } from "lib";
import { assignmentsFixture, peopleFixture, projectsFixture, scenariosFixture } from "fixtures";

let scenarios;
let assignments;
let people;
let projects;

describe("ScenarioParser", () => {
  let project1Assignments;
  let project2Assignments;

  beforeEach(() => {
    scenarios = scenariosFixture.buildList(1);
    project1Assignments = [
      assignmentsFixture.build({
        projectId: `project-0`,
        personId: `person-0`,
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2020, 11, 31),
      }),
      assignmentsFixture.build({
        projectId: `project-0`,
        personId: `person-1`,
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2020, 11, 31),
      }),
      assignmentsFixture.build({
        projectId: `project-0`,
        personId: `person-2`,
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2020, 6, 31),
      }),
    ];
    project2Assignments = [
      assignmentsFixture.build({
        projectId: `project-1`,
        personId: `person-0`,
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2020, 11, 31),
      }),
      assignmentsFixture.build({
        projectId: `project-1`,
        personId: `person-1`,
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2020, 11, 31),
      }),
      assignmentsFixture.build({
        projectId: `project-1`,
        personId: `person-2`,
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2020, 6, 31),
      }),
    ];
    assignments = [...project1Assignments, ...project2Assignments];
    people = peopleFixture.buildList(assignments.length);
    projects = projectsFixture.buildList(2);
  });

  describe("with data from Forecast (current projects)", () => {
    it("returns data in the correct shape", () => {
      const actual = ScenarioParser(scenarios, assignments, people, projects);

      let project1People = project1Assignments.map((a) => people.find((p) => p.id === a.personId));
      let project2People = project2Assignments.map((a) => people.find((p) => p.id === a.personId));

      const expected = [
        {
          id: scenarios[0].id,
          title: scenarios[0].name,
          projects: [
            {
              id: projects[0].id,
              name: projects[0].name,
              startDate: new Date(Math.min(...project1Assignments.map((p) => p.startDate))),
              endDate: new Date(Math.max(...project1Assignments.map((p) => p.endDate))),
              people: defaultPeopleSort(project1People).map((p) => ({
                ...p,
                assignment: project1Assignments.find((a) => a.personId === p.id),
              })),
            },
            {
              id: projects[1].id,
              name: projects[1].name,
              startDate: new Date(Math.min(...project2Assignments.map((p) => p.startDate))),
              endDate: new Date(Math.max(...project2Assignments.map((p) => p.endDate))),
              people: defaultPeopleSort(project2People).map((p) => ({
                ...p,
                assignment: project2Assignments.find((a) => a.personId === p.id),
              })),
            },
          ],
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe("with data from Airtable (potential projects)", () => {
    let scenarioAssignments;

    beforeEach(() => {
      scenarios = scenariosFixture.buildList(2);
      scenarioAssignments = assignments.map((a, i) => ({
        ...a,
        scenarios: [a.projectId === "project-0" ? scenarios[0].id : scenarios[1].id],
      }));
      project1Assignments = scenarioAssignments.filter((a) => a.projectId === "project-0");
      project2Assignments = scenarioAssignments.filter((a) => a.projectId === "project-1");
    });

    it("returns data in the correct shape", () => {
      const actual = ScenarioParser(scenarios, scenarioAssignments, people, projects);

      let project1 = projects.find((p) => p.id === "project-0");
      let project2 = projects.find((p) => p.id === "project-1");

      let project1People = project1Assignments.map((a) => people.find((p) => p.id === a.personId));
      let project2People = project2Assignments.map((a) => people.find((p) => p.id === a.personId));

      const expected = [
        {
          id: scenarios[0].id,
          title: scenarios[0].name,
          projects: [
            {
              id: project1.id,
              name: project1.name,
              startDate: new Date(2020, 0, 1),
              endDate: new Date(2020, 11, 31),
              people: defaultPeopleSort(project1People).map((p) => ({
                ...p,
                assignment: project1Assignments.find((a) => a.personId === p.id),
              })),
            },
          ],
        },
        {
          id: scenarios[1].id,
          title: scenarios[1].name,
          projects: [
            {
              id: project2.id,
              name: project2.name,
              startDate: new Date(2020, 0, 1),
              endDate: new Date(2020, 11, 31),
              people: defaultPeopleSort(project2People).map((p) => ({
                ...p,
                assignment: project2Assignments.find((a) => a.personId === p.id),
              })),
            },
          ],
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe("with a staffing need and no person to fill it", () => {
    let project2;

    beforeEach(() => {
      project2 = projects.find((p) => p.id === "project-1");
      project2.engineeringSeats = 2;
      project2.startDate = new Date(2020, 3, 1);
      project2.endDate = new Date(2020, 9, 1);
      people.forEach((p) => (p.roles = [DESIGN_ROLE]));
    });

    it("creates a person on the project to represent a staffing need", () => {
      const parsedScenarios = ScenarioParser(scenarios, assignments, people, projects);
      let parsedProject = parsedScenarios[0].projects.find((p) => p.id === project2.id);

      let actual = parsedProject.people;

      const expected = [
        {
          id: `Staffing Need 1-${ENGINEER_ROLE}-project-1`,
          firstName: "Staffing Need",
          roles: [ENGINEER_ROLE],
          assignment: {
            startDate: new Date(2020, 3, 1),
            endDate: new Date(2020, 9, 1),
          },
        },
        {
          id: `Staffing Need 2-${ENGINEER_ROLE}-project-1`,
          roles: [ENGINEER_ROLE],
          firstName: "Staffing Need",
          assignment: {
            startDate: new Date(2020, 3, 1),
            endDate: new Date(2020, 9, 1),
          },
        },
      ];

      expect(actual.length).toEqual(project2Assignments.length + project2.engineeringSeats);
      expect(actual).toEqual(expect.arrayContaining(expected));
    });
  });
});
