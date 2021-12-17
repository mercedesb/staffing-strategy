import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useApi } from "react-use-fetch-api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { TokenContext } from "contexts";

dayjs.extend(customParseFormat);

const baseUrl = `/api`;

const useServer = () => {
  const history = useHistory();

  const onUnauthorized = () => {
    history.push("/logout");
  };

  const { jwt } = useContext(TokenContext);
  const { get, post, put, del } = useApi(onUnauthorized);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${jwt}`,
  };

  return {
    createAssignment: async (data) => {
      return await post(`${baseUrl}/assignments`, data, headers);
    },
    getCurrentAssignments: async () => {
      const response = await get(`${baseUrl}/assignments/current`, headers);
      return response.map((a) => ({
        ...a,
        startDate: dayjs(a.startDate).toDate(),
        endDate: dayjs(a.endDate).toDate(),
      }));
    },
    getUpcomingAssignments: async () => {
      const response = await get(`${baseUrl}/assignments/upcoming`, headers);
      return response.map((a) => ({
        ...a,
        startDate: dayjs(a.startDate).toDate(),
        endDate: dayjs(a.endDate).toDate(),
      }));
    },
    updateAssignment: async (id, data) => {
      return await put(`${baseUrl}/assignments/${id}`, data, headers);
    },
    deleteAssignment: async (id) => {
      return await del(`${baseUrl}/assignments/${id}`, headers);
    },
    createPerson: async (data) => {
      return await post(`${baseUrl}/people`, data, headers);
    },
    getCurrentPeople: async () => {
      return await get(`${baseUrl}/people/current`, headers);
    },
    getUpcomingPeople: async () => {
      return await get(`${baseUrl}/people/upcoming`, headers);
    },
    updatePerson: async (id, data) => {
      return await put(`${baseUrl}/people/${id}`, data, headers);
    },
    deletePerson: async (id) => {
      return await del(`${baseUrl}/people/${id}`, headers);
    },
    createProject: async (data) => {
      return await post(`${baseUrl}/projects`, data, headers);
    },
    getCurrentProjects: async () => {
      return await get(`${baseUrl}/projects/current`, headers);
    },
    getUpcomingProjects: async () => {
      const response = await get(`${baseUrl}/projects/upcoming`, headers);
      return response.map((p) => ({
        ...p,
        startDate: dayjs(p.startDate).toDate(),
        endDate: dayjs(p.endDate).toDate(),
      }));
    },
    updateProject: async (id, data) => {
      return await put(`${baseUrl}/projects/${id}`, data, headers);
    },
    deleteProject: async (id) => {
      return await del(`${baseUrl}/projects/${id}`, headers);
    },
    createScenario: async (data) => {
      return await post(`${baseUrl}/scenarios`, data, headers);
    },
    getScenarios: async () => {
      return await get(`${baseUrl}/scenarios/upcoming`, headers);
    },
    updateScenario: async (id, data) => {
      return await put(`${baseUrl}/scenarios/${id}`, data, headers);
    },
    deleteScenario: async (id) => {
      return await del(`${baseUrl}/scenarios/${id}`, headers);
    },
    getDeals: async () => {
      return await get(`${baseUrl}/deals/current`, headers);
    },
    getStages: async () => {
      return await get(`${baseUrl}/stages/current`, headers);
    },
  };
};

export default useServer;
