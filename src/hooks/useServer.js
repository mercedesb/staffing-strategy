import { useApi } from "react-use-fetch-api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

const useServer = () => {
  const { get, post, put, del } = useApi();

  return {
    createAssignment: async (data) => {
      return await post(`${baseUrl}/assignment`, data);
    },
    getCurrentAssignments: async () => {
      const response = await get(`${baseUrl}/current-assignments`);
      return response.map((a) => ({
        ...a,
        startDate: dayjs(a.startDate).toDate(),
        endDate: dayjs(a.endDate).toDate(),
      }));
    },
    getUpcomingAssignments: async () => {
      const response = await get(`${baseUrl}/upcoming-assignments`);
      return response.map((a) => ({
        ...a,
        startDate: dayjs(a.startDate).toDate(),
        endDate: dayjs(a.endDate).toDate(),
      }));
    },
    updateAssignment: async (id, data) => {
      return await put(`${baseUrl}/assignment/${id}`, data);
    },
    deleteAssignment: async (id) => {
      return await del(`${baseUrl}/assignment/${id}`);
    },
    createPerson: async (data) => {
      return await post(`${baseUrl}/person`, data);
    },
    getCurrentPeople: async () => {
      return await get(`${baseUrl}/current-people`);
    },
    getUpcomingPeople: async () => {
      return await get(`${baseUrl}/upcoming-people`);
    },
    updatePerson: async (id, data) => {
      return await put(`${baseUrl}/person/${id}`, data);
    },
    deletePerson: async (id) => {
      return await del(`${baseUrl}/person/${id}`);
    },
    createProject: async (data) => {
      return await post(`${baseUrl}/project`, data);
    },
    getCurrentProjects: async () => {
      return await get(`${baseUrl}/current-projects`);
    },
    getUpcomingProjects: async () => {
      const response = await get(`${baseUrl}/upcoming-projects`);
      return response.map((p) => ({
        ...p,
        startDate: dayjs(p.startDate).toDate(),
        endDate: dayjs(p.endDate).toDate(),
      }));
    },
    updateProject: async (id, data) => {
      return await put(`${baseUrl}/project/${id}`, data);
    },
    deleteProject: async (id) => {
      return await del(`${baseUrl}/project/${id}`);
    },
    createScenario: async (data) => {
      return await post(`${baseUrl}/scenario`, data);
    },
    getScenarios: async () => {
      return await get(`${baseUrl}/upcoming-scenarios`);
    },
    updateScenario: async (id, data) => {
      return await put(`${baseUrl}/scenario/${id}`, data);
    },
    deleteScenario: async (id) => {
      return await del(`${baseUrl}/scenario/${id}`);
    },
    getDeals: async () => {
      return await get(`${baseUrl}/deals`);
    },
    getStages: async () => {
      return await get(`${baseUrl}/stages`);
    },
  };
};

export default useServer;
