const faker = require("faker");

const airtable = require("../airtable");
const restClient = require("../restClient");

jest.mock("../restClient");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("airtable", () => {
  describe("create actions", () => {
    beforeEach(() => {
      restClient.post.mockResolvedValue({ data: {} });
    });

    describe("createAssignment", () => {
      it("turns startDate and endDate into a string before sending", async () => {
        const { createAssignment } = airtable();
        await createAssignment({ startDate: new Date(), endDate: new Date() });
        expect(restClient.post).toHaveBeenCalledWith(
          expect.stringMatching(/Assignments$/),
          expect.objectContaining({
            fields: {
              startDate: expect.stringMatching(/\d{4}-\d{2}-\d{2}/),
              endDate: expect.stringMatching(/\d{4}-\d{2}-\d{2}/),
            },
          }),
          expect.objectContaining({
            Authorization: expect.any(String),
          })
        );
      });
    });

    describe("createPerson", () => {
      it("sends data in the correct shape", async () => {
        const { createPerson } = airtable();
        await createPerson({});
        expect(restClient.post).toHaveBeenCalledWith(
          expect.stringMatching(/People$/),
          expect.objectContaining({
            fields: expect.any(Object),
          }),
          expect.objectContaining({
            Authorization: expect.any(String),
          })
        );
      });
    });

    describe("createProject", () => {
      it("turns startDate and endDate into a string before sending", async () => {
        const { createProject } = airtable();
        await createProject({ startDate: new Date(), endDate: new Date() });
        expect(restClient.post).toHaveBeenCalledWith(
          expect.stringMatching(/Projects$/),
          expect.objectContaining({
            fields: {
              startDate: expect.stringMatching(/\d{4}-\d{2}-\d{2}/),
              endDate: expect.stringMatching(/\d{4}-\d{2}-\d{2}/),
            },
          }),
          expect.objectContaining({
            Authorization: expect.any(String),
          })
        );
      });
    });

    describe("createScenario", () => {
      it("sends data in the correct shape", async () => {
        const { createScenario } = airtable();
        await createScenario({});
        expect(restClient.post).toHaveBeenCalledWith(
          expect.stringMatching(/Scenarios$/),
          expect.objectContaining({
            fields: expect.any(Object),
          }),
          expect.objectContaining({
            Authorization: expect.any(String),
          })
        );
      });
    });
  });

  describe("read actions", () => {
    describe("getAssignments", () => {
      let mockResolvedValue;

      beforeEach(() => {
        mockResolvedValue = [
          {
            id: "recId1",
            fields: {
              projectId: "projectId1",
              personId: "personId1",
              deleted: false,
              scenarioId: ["scenarioId1"],
              startDate: "2020-11-01",
              endDate: "2021-01-31",
            },
          },
          {
            id: "recId2",
            fields: {
              projectId: null,
              personId: "personId1",
              deleted: false,
              scenarioId: ["scenarioId1"],
              startDate: "2020-11-01",
              endDate: "2021-01-31",
            },
          },
          {
            id: "recId3",
            fields: {
              projectId: "projectId1",
              personId: null,
              deleted: false,
              scenarioId: ["scenarioId1"],
              startDate: "2020-11-01",
              endDate: "2021-01-31",
            },
          },
          {
            id: "recId4",
            fields: {
              projectId: "projectId1",
              personId: "personId2",
              deleted: true,
              scenarioId: ["scenarioId1"],
              startDate: "2020-11-01",
              endDate: "2021-01-31",
            },
          },
        ];

        restClient.get.mockResolvedValue({
          data: {
            records: mockResolvedValue,
          },
        });
      });

      it("does not return records without a projectId", async () => {
        const { getAssignments } = airtable();
        const actual = await getAssignments();
        expect(actual.map((a) => a.id)).not.toEqual(expect.arrayContaining([mockResolvedValue[1].id]));
        expect(actual.map((a) => a.id)).toEqual([mockResolvedValue[0].id]);
      });

      it("does not return records without a personId", async () => {
        const { getAssignments } = airtable();
        const actual = await getAssignments();
        expect(actual.map((a) => a.id)).not.toEqual(expect.arrayContaining([mockResolvedValue[2].id]));
        expect(actual.map((a) => a.id)).toEqual([mockResolvedValue[0].id]);
      });

      it("does not return deleted records", async () => {
        const { getAssignments } = airtable();
        const actual = await getAssignments();
        expect(actual.map((a) => a.id)).not.toEqual(expect.arrayContaining([mockResolvedValue[3].id]));
        expect(actual.map((a) => a.id)).toEqual([mockResolvedValue[0].id]);
      });

      it("adds the record as the id of the returned object", async () => {
        const { getAssignments } = airtable();
        const response = await getAssignments();
        const actual = response[0];

        expect(actual.id).toEqual(mockResolvedValue[0].id);
      });

      it("turns the returned startDate and endDate into a Date object", async () => {
        const { getAssignments } = airtable();
        const response = await getAssignments();
        const actual = response[0];

        expect(actual.startDate).toEqual(expect.any(Date));
        expect(actual.endDate).toEqual(expect.any(Date));
      });

      it("turns the returned scenarioId into scenarios", async () => {
        const { getAssignments } = airtable();
        const response = await getAssignments();
        const actual = response[0];

        expect(actual.scenarios).toEqual(mockResolvedValue[0].fields.scenarioId);
      });

      it("adds editable and deletable to the returned assignments", async () => {
        const { getAssignments } = airtable();
        const response = await getAssignments();
        const actual = response[0];

        expect(actual.editable).toEqual(true);
        expect(actual.deletable).toEqual(true);
      });
    });

    describe("getPeople", () => {
      let mockResolvedValue;

      beforeEach(() => {
        mockResolvedValue = [
          {
            id: "recId1",
            fields: {
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName(),
              deleted: false,
            },
          },
          {
            id: "recId2",
            fields: {
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName(),
              deleted: true,
            },
          },
        ];

        restClient.get.mockResolvedValue({
          data: {
            records: mockResolvedValue,
          },
        });
      });

      it("does not return deleted records", async () => {
        const { getPeople } = airtable();
        const actual = await getPeople();
        expect(actual.map((a) => a.id)).not.toEqual(expect.arrayContaining([mockResolvedValue[1].id]));
        expect(actual.map((a) => a.id)).toEqual([mockResolvedValue[0].id]);
      });

      it("adds the record as the id of the returned object", async () => {
        const { getPeople } = airtable();
        const response = await getPeople();
        const actual = response[0];

        expect(actual.id).toEqual(mockResolvedValue[0].id);
      });

      it("adds editable and deletable to the returned assignments", async () => {
        const { getPeople } = airtable();
        const response = await getPeople();
        const actual = response[0];

        expect(actual.editable).toEqual(true);
        expect(actual.deletable).toEqual(true);
      });
    });

    describe("getProjects", () => {
      let mockResolvedValue;

      beforeEach(() => {
        mockResolvedValue = [
          {
            id: "recId1",
            fields: {
              id: "projectId1",
              deleted: false,
              startDate: "2020-11-01",
              endDate: "2021-01-31",
            },
          },
          {
            id: "recId2",
            fields: {
              id: null,
              deleted: false,
              startDate: "2020-11-01",
              endDate: "2021-01-31",
            },
          },
          {
            id: "recId3",
            fields: {
              id: "projectId2",
              deleted: true,
              startDate: "2020-11-01",
              endDate: "2021-01-31",
            },
          },
        ];

        restClient.get.mockResolvedValue({
          data: {
            records: mockResolvedValue,
          },
        });
      });

      it("does not return records without an id", async () => {
        const { getProjects } = airtable();
        const actual = await getProjects();
        expect(actual.map((a) => a.id)).not.toEqual(expect.arrayContaining([mockResolvedValue[1].id]));
        expect(actual.map((a) => a.id)).toEqual([mockResolvedValue[0].id]);
      });

      it("does not return deleted records", async () => {
        const { getProjects } = airtable();
        const actual = await getProjects();
        expect(actual.map((a) => a.id)).not.toEqual(expect.arrayContaining([mockResolvedValue[2].id]));
        expect(actual.map((a) => a.id)).toEqual([mockResolvedValue[0].id]);
      });

      it("adds the record as the id of the returned object", async () => {
        const { getProjects } = airtable();
        const response = await getProjects();
        const actual = response[0];

        expect(actual.id).toEqual(mockResolvedValue[0].id);
      });

      it("turns the returned startDate and endDate into a Date object", async () => {
        const { getProjects } = airtable();
        const response = await getProjects();
        const actual = response[0];

        expect(actual.startDate).toEqual(expect.any(Date));
        expect(actual.endDate).toEqual(expect.any(Date));
      });

      it("adds editable and deletable to the returned assignments", async () => {
        const { getProjects } = airtable();
        const response = await getProjects();
        const actual = response[0];

        expect(actual.editable).toEqual(true);
        expect(actual.deletable).toEqual(true);
      });
    });

    describe("getPeople", () => {
      let mockResolvedValue;

      beforeEach(() => {
        mockResolvedValue = [
          {
            id: "recId1",
            fields: {
              name: faker.lorem.word(),
              deleted: false,
            },
          },
          {
            id: "recId2",
            fields: {
              name: faker.lorem.word(),
              deleted: true,
            },
          },
        ];

        restClient.get.mockResolvedValue({
          data: {
            records: mockResolvedValue,
          },
        });
      });

      it("does not return deleted records", async () => {
        const { getScenarios } = airtable();
        const actual = await getScenarios();
        expect(actual.map((a) => a.id)).not.toEqual(expect.arrayContaining([mockResolvedValue[1].id]));
        expect(actual.map((a) => a.id)).toEqual([mockResolvedValue[0].id]);
      });

      it("adds the record as the id of the returned object", async () => {
        const { getScenarios } = airtable();
        const response = await getScenarios();
        const actual = response[0];

        expect(actual.id).toEqual(mockResolvedValue[0].id);
      });

      it("adds editable and deletable to the returned assignments", async () => {
        const { getScenarios } = airtable();
        const response = await getScenarios();
        const actual = response[0];

        expect(actual.editable).toEqual(true);
        expect(actual.deletable).toEqual(true);
      });
    });
  });
});
