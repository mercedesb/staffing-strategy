import { useApi } from "react-use-fetch-api";
import dayjs from "dayjs";

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}`;

const useAirtable = () => {
  const { get, post } = useApi();

  return {
    createScenario: async (data) => {
      let postData = {
        fields: { ...data },
      };

      const response = await post(`${baseUrl}/Scenarios`, postData, headers);
      return response;
    },
    createProject: async (data) => {
      let postData = {
        fields: { ...data },
      };

      const response = await post(`${baseUrl}/Scenarios`, postData, headers);
      return response;
    },
    getAssignments: async () => {
      const response = await get(`${baseUrl}/Assignments`, headers);
      return response.records
        .filter((a) => !!a.fields.id && !!a.fields.projectId && !!a.fields.personId)
        .map((a) => ({
          ...a.fields,
          id: a.fields.id.toString(),
          projectId: a.fields.projectId.toString(),
          personId: a.fields.personId.toString(),
          scenarios: a.fields.scenarioId,
          startDate: dayjs(a.fields.startDate).toDate(),
          endDate: dayjs(a.fields.endDate).toDate(),
        }));
    },
    getPeople: async () => {
      const response = await get(`${baseUrl}/People`, headers);
      return response.records.filter((p) => !!p.fields.id).map((p) => ({ ...p.fields, id: p.id }));
    },
    getProjects: async () => {
      const response = await get(`${baseUrl}/Projects`, headers);
      return response.records
        .filter((p) => !!p.fields.id)
        .map((p) => ({
          ...p.fields,
          id: p.id,
          startDate: dayjs(p.fields.startDate).toDate(),
          endDate: dayjs(p.fields.endDate).toDate(),
        }));
    },
    getScenarios: async () => {
      const response = await get(`${baseUrl}/Scenarios`, headers);
      return response.records.map((s) => ({ ...s.fields, id: s.id }));
    },
  };
};

export default useAirtable;
