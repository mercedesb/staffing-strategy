const forecast = require("../forecast");

jest.mock("forecast-promise", () =>
  jest.fn().mockReturnValue({
    assignments: jest.fn().mockResolvedValue([
      {
        id: 2,
        person_id: 3,
        project_id: 4,
        start_date: new Date(),
        end_date: new Date(),
      },
      {
        id: 2,
        person_id: null,
        project_id: 4,
        start_date: new Date(),
        end_date: new Date(),
      },
      {
        id: 2,
        person_id: 3,
        project_id: null,
        start_date: new Date(),
        end_date: new Date(),
      },
    ]),
    people: jest.fn().mockResolvedValue([
      {
        id: 2,
        first_name: "first-name-1",
        last_name: "last-name-1",
      },
      {
        id: null,
        first_name: "first-name-2",
        last_name: "last-name-2",
      },
    ]),
    projects: jest.fn().mockResolvedValue([
      {
        id: 2,
        code: "code-1",
        name: "name-1",
      },
      {
        id: null,
        code: "code-2",
        name: "name-2",
      },
    ]),
  })
);

describe("forecast", () => {
  describe("getAssignments", () => {
    it("returns an array of assignments", async () => {
      const { getAssignments } = forecast();
      const actual = await getAssignments();
      expect(actual).toBeInstanceOf(Array);
    });

    it("does not return assignments without an id", async () => {
      const { getAssignments } = forecast();
      const actual = await getAssignments();
      expect(actual.length).toEqual(1);
    });

    it("does not return assignments without a project_id", async () => {
      const { getAssignments } = forecast();
      const actual = await getAssignments();
      expect(actual.length).toEqual(1);
    });

    it("does not return assignments without a person_id", async () => {
      const { getAssignments } = forecast();
      const actual = await getAssignments();
      expect(actual.length).toEqual(1);
    });

    it("returns the id as a string", async () => {
      const { getAssignments } = forecast();
      const actual = await getAssignments();
      actual.forEach((deal) => {
        expect(deal).toEqual(
          expect.objectContaining({
            id: expect.any(String),
          })
        );
      });
    });

    it("returns the projectId as a string", async () => {
      const { getAssignments } = forecast();
      const actual = await getAssignments();
      actual.forEach((deal) => {
        expect(deal).toEqual(
          expect.objectContaining({
            projectId: expect.any(String),
          })
        );
      });
    });

    it("returns the personId as a string", async () => {
      const { getAssignments } = forecast();
      const actual = await getAssignments();
      actual.forEach((deal) => {
        expect(deal).toEqual(
          expect.objectContaining({
            personId: expect.any(String),
          })
        );
      });
    });

    it("turns the returned startDate and endDate into a Date object", async () => {
      const { getAssignments } = forecast();
      const response = await getAssignments();
      const actual = response[0];

      expect(actual.startDate).toEqual(expect.any(Date));
      expect(actual.endDate).toEqual(expect.any(Date));
    });

    it("returns the expected object shape", async () => {
      const { getAssignments } = forecast();
      const response = await getAssignments();
      const actual = response[0];

      expect(actual).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          personId: expect.any(String),
          projectId: expect.any(String),
          startDate: expect.any(Date),
          endDate: expect.any(Date),
        })
      );
    });
  });

  describe("getPeople", () => {
    it("returns an array of people", async () => {
      const { getPeople } = forecast();
      const actual = await getPeople();
      expect(actual).toBeInstanceOf(Array);
    });

    it("does not return people without an id", async () => {
      const { getPeople } = forecast();
      const actual = await getPeople();
      expect(actual.length).toEqual(1);
    });

    it("returns the expected object shape", async () => {
      const { getPeople } = forecast();
      const response = await getPeople();
      const actual = response[0];

      expect(actual).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
        })
      );
    });
  });

  describe("getProjects", () => {
    it("returns an array of projects", async () => {
      const { getProjects } = forecast();
      const actual = await getProjects();
      expect(actual).toBeInstanceOf(Array);
    });

    it("does not return projects without an id", async () => {
      const { getProjects } = forecast();
      const actual = await getProjects();
      expect(actual.length).toEqual(1);
    });

    it("returns the expected object shape", async () => {
      const { getProjects } = forecast();
      const response = await getProjects();
      const actual = response[0];

      expect(actual).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        })
      );
    });
  });
});
