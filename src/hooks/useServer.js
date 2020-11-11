import { useContext } from "react";
import { useApi } from "react-use-fetch-api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { TokenContext } from "contexts";

dayjs.extend(customParseFormat);

const baseUrl = `${process.env.REACT_APP_SERVER_API_URL}/api`;

const useServer = () => {
  const { jwt } = useContext(TokenContext);
  const { get, post, put, del } = useApi();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${jwt}`,
  };

  return {
    createAssignment: async (data) => {
      return await post(`${baseUrl}/assignment`, data, headers);
    },
    getCurrentAssignments: async () => {
      const response = await get(`${baseUrl}/current-assignments`, headers);
      return response.map((a) => ({
        ...a,
        startDate: dayjs(a.startDate).toDate(),
        endDate: dayjs(a.endDate).toDate(),
      }));
    },
    getUpcomingAssignments: async () => {
      const response = await get(`${baseUrl}/upcoming-assignments`, headers);
      return response.map((a) => ({
        ...a,
        startDate: dayjs(a.startDate).toDate(),
        endDate: dayjs(a.endDate).toDate(),
      }));
    },
    updateAssignment: async (id, data) => {
      return await put(`${baseUrl}/assignment/${id}`, data, headers);
    },
    deleteAssignment: async (id) => {
      return await del(`${baseUrl}/assignment/${id}`, headers);
    },
    createPerson: async (data) => {
      return await post(`${baseUrl}/person`, data, headers);
    },
    getCurrentPeople: async () => {
      return await get(`${baseUrl}/current-people`, headers);
    },
    getUpcomingPeople: async () => {
      return await get(`${baseUrl}/upcoming-people`, headers);
    },
    updatePerson: async (id, data) => {
      return await put(`${baseUrl}/person/${id}`, data, headers);
    },
    deletePerson: async (id) => {
      return await del(`${baseUrl}/person/${id}`, headers);
    },
    createProject: async (data) => {
      return await post(`${baseUrl}/project`, data, headers);
    },
    getCurrentProjects: async () => {
      return await get(`${baseUrl}/current-projects`, headers);
    },
    getUpcomingProjects: async () => {
      const response = await get(`${baseUrl}/upcoming-projects`, headers);
      return response.map((p) => ({
        ...p,
        startDate: dayjs(p.startDate).toDate(),
        endDate: dayjs(p.endDate).toDate(),
      }));
    },
    updateProject: async (id, data) => {
      return await put(`${baseUrl}/project/${id}`, data, headers);
    },
    deleteProject: async (id) => {
      return await del(`${baseUrl}/project/${id}`, headers);
    },
    createScenario: async (data) => {
      return await post(`${baseUrl}/scenario`, data, headers);
    },
    getScenarios: async () => {
      return await get(`${baseUrl}/upcoming-scenarios`, headers);
    },
    updateScenario: async (id, data) => {
      return await put(`${baseUrl}/scenario/${id}`, data, headers);
    },
    deleteScenario: async (id) => {
      return await del(`${baseUrl}/scenario/${id}`, headers);
    },
    getDeals: async () => {
      return await get(`${baseUrl}/deals`, headers);
    },
    getStages: async () => {
      return await get(`${baseUrl}/stages`, headers);
    },
  };
};

export default useServer;
