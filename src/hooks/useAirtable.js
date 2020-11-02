import { useApi } from "react-use-fetch-api";
import dayjs from "dayjs";

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}`;

const useAirtable = () => {
  const { get } = useApi();

  return {
    getAssignments: async () => {
      const rawAssignments = await get(`${baseUrl}/Assignments`, headers);
      return rawAssignments.records
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
      const rawPeople = await get(`${baseUrl}/People`, headers);
      return rawPeople.records.filter((p) => !!p.fields.id).map((p) => ({ ...p.fields, id: p.id }));
    },
    getProjects: async () => {
      const rawProjects = await get(`${baseUrl}/Projects`, headers);
      return rawProjects.records
        .filter((p) => !!p.fields.id)
        .map((p) => ({
          ...p.fields,
          id: p.id,
          startDate: dayjs(p.fields.startDate).toDate(),
          endDate: dayjs(p.fields.endDate).toDate(),
        }));
    },
    getScenarios: async () => {
      const rawScenarios = await get(`${baseUrl}/Scenarios`, headers);
      return rawScenarios.records.map((s) => ({ ...s.fields, id: s.id }));
    },
  };
};

export default useAirtable;
