import { useApi } from "react-use-fetch-api";

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
      return rawAssignments.records.map((a) => ({ ...a.fields }));
    },
    getPeople: async () => {
      const rawPeople = await get(`${baseUrl}/People`, headers);
      return rawPeople.records.filter((p) => !!p.fields.id).map((p) => ({ ...p.fields, id: p.fields.id.toString() }));
    },
    getScenarios: async () => {
      const rawScenarios = await get(`${baseUrl}/Scenarios`, headers);
      return rawScenarios.records.map((s) => ({ ...s.fields, id: s.id }));
    },
  };
};

export default useAirtable;
