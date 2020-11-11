const restClient = require("./restClient");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(customParseFormat);

const AIRTABLE_DATE_FORMAT = "YYYY-MM-DD";

const headers = {
  Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

const baseUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;
const { get, post, put, patch } = restClient();

const airtable = () => {
  return {
    createAssignment: async (data) => {
      let postData = {
        fields: {
          ...data,
          startDate: dayjs(data.startDate).format(AIRTABLE_DATE_FORMAT),
          endDate: dayjs(data.endDate).format(AIRTABLE_DATE_FORMAT),
        },
      };

      const response = await post(`${baseUrl}/Assignments`, postData, headers);
      return response.data.records;
    },
    createPerson: async (data) => {
      let postData = {
        fields: { ...data },
      };

      const response = await post(`${baseUrl}/People`, postData, headers);
      return response.data.records;
    },
    createProject: async (data) => {
      let postData = {
        fields: {
          ...data,
          startDate: dayjs(data.startDate).format(AIRTABLE_DATE_FORMAT),
          endDate: dayjs(data.endDate).format(AIRTABLE_DATE_FORMAT),
        },
      };

      const response = await post(`${baseUrl}/Projects`, postData, headers);
      return response.data.records;
    },
    createScenario: async (data) => {
      let postData = {
        fields: { ...data },
      };

      const response = await post(`${baseUrl}/Scenarios`, postData, headers);
      return response.data.records;
    },
    getAssignments: async () => {
      const response = await get(`${baseUrl}/Assignments`, headers);
      return response.data.records
        .filter((a) => !!a.fields.projectId && !!a.fields.personId && !a.fields.deleted)
        .map((a) => ({
          ...a.fields,
          id: a.id.toString(),
          projectId: a.fields.projectId.toString(),
          personId: a.fields.personId.toString(),
          scenarios: a.fields.scenarioId,
          startDate: dayjs(a.fields.startDate).toDate(),
          endDate: dayjs(a.fields.endDate).toDate(),
          editable: true,
          deletable: true,
        }));
    },
    getPeople: async () => {
      const response = await get(`${baseUrl}/People`, headers);
      return response.data.records
        .filter((p) => !p.fields.deleted)
        .map((p) => ({ ...p.fields, id: p.id, editable: true, deletable: true }));
    },
    getProjects: async () => {
      const response = await get(`${baseUrl}/Projects`, headers);

      return response.data.records
        .filter((p) => !!p.fields.id && !p.fields.deleted)
        .map((p) => ({
          ...p.fields,
          id: p.id,
          startDate: dayjs(p.fields.startDate, AIRTABLE_DATE_FORMAT).toDate(),
          endDate: dayjs(p.fields.endDate, AIRTABLE_DATE_FORMAT).toDate(),
          editable: true,
          deletable: true,
        }));
    },
    getScenarios: async () => {
      const response = await get(`${baseUrl}/Scenarios`, headers);
      return response.data.records
        .filter((s) => !s.fields.deleted)
        .map((s) => ({ ...s.fields, id: s.id, editable: true, deletable: true }));
    },
    updateAssignment: async (id, data) => {
      let putData = {
        records: [
          {
            id: id,
            fields: {
              personId: data.personId,
              projectId: data.projectId,
              scenarioId: data.scenarios,
              startDate: dayjs(data.startDate).format(AIRTABLE_DATE_FORMAT),
              endDate: dayjs(data.endDate).format(AIRTABLE_DATE_FORMAT),
            },
          },
        ],
      };

      const response = await put(`${baseUrl}/Assignments`, putData, headers);
      return response.data.records;
    },
    updatePerson: async (id, data) => {
      let putData = {
        records: [
          {
            id: id,
            fields: {
              firstName: data.firstName,
              lastName: data.lastName,
              roles: data.roles,
            },
          },
        ],
      };

      const response = await put(`${baseUrl}/People`, putData, headers);
      return response.data.records;
    },
    updateProject: async (id, data) => {
      let putData = {
        records: [
          {
            id: id,
            fields: {
              name: data.name,
              scenarios: data.scenarios,
              startDate: dayjs(data.startDate).format(AIRTABLE_DATE_FORMAT),
              endDate: dayjs(data.endDate).format(AIRTABLE_DATE_FORMAT),
              likelihood: data.likelihood,
              engineeringSeats: data.engineeringSeats,
              designSeats: data.designSeats,
              engagementSeats: data.engagementSeats,
              dealId: data.dealId,
            },
          },
        ],
      };

      const response = await put(`${baseUrl}/Projects`, putData, headers);
      return response.data.records;
    },
    updateScenario: async (id, data) => {
      let putData = {
        records: [
          {
            id: id,
            fields: {
              name: data.name,
            },
          },
        ],
      };

      const response = await put(`${baseUrl}/Scenarios`, putData, headers);
      return response.data.records;
    },
    deleteAssignment: async (id) => {
      let deleteData = {
        records: [
          {
            id: id,
            fields: {
              deleted: true,
            },
          },
        ],
      };

      const response = await patch(`${baseUrl}/Assignments`, deleteData, headers);
      return response.data.records;
    },
    deletePerson: async (id) => {
      let deleteData = {
        records: [
          {
            id: id,
            fields: {
              deleted: true,
            },
          },
        ],
      };

      const response = await patch(`${baseUrl}/People`, deleteData, headers);
      return response.data.records;
    },
    deleteProject: async (id) => {
      let deleteData = {
        records: [
          {
            id: id,
            fields: {
              deleted: true,
            },
          },
        ],
      };

      const response = await patch(`${baseUrl}/Projects`, deleteData, headers);
      return response.data.records;
    },
    deleteScenario: async (id) => {
      let deleteData = {
        records: [
          {
            id: id,
            fields: {
              deleted: true,
            },
          },
        ],
      };

      const response = await patch(`${baseUrl}/Scenarios`, deleteData, headers);
      return response.data.records;
    },
    getUserByEmail: async (email) => {
      const filterFormula = `FIND("${email}", email)`;

      const response = await get(`${baseUrl}/Users?filterByFormula=${encodeURIComponent(filterFormula)}`, headers);
      return response.data.records.map((u) => ({ ...u.fields, id: u.id }))[0];
    },
    updateUser: async (id, data) => {
      let patchData = {
        records: [
          {
            id: id,
            fields: {
              refreshToken: data.refreshToken,
            },
          },
        ],
      };

      const response = await patch(`${baseUrl}/Users`, patchData, headers);
      return response.data.records.map((u) => ({ ...u.fields, id: u.id }))[0];
    },
  };
};

module.exports = airtable;
