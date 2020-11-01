import Forecast from "forecast-promise";
import dayjs from "dayjs";

const forecast = new Forecast({
  accountId: process.env.REACT_APP_FORECAST_ACCOUNT_ID,
  token: process.env.REACT_APP_FORECAST_TOKEN,
});

const useForecast = () => ({
  getAssignments: async () => {
    const options = {
      startDate: new Date(),
    };
    const assignments = await forecast.assignments(options);
    return assignments
      .filter((a) => !!a.id && !!a.project_id && !!a.person_id)
      .map((a) => ({
        ...a,
        id: a.id.toString(),
        projectId: a.project_id.toString(),
        personId: a.person_id.toString(),
        startDate: dayjs(a.start_date).toDate(),
        endDate: dayjs(a.end_date).toDate(),
      }));
  },
  getPeople: async () => {
    const people = await forecast.people();
    return people
      .filter((p) => !!p.id)
      .map((p) => ({
        ...p,
        id: p.id.toString(),
        firstName: p.first_name,
        lastName: p.last_name,
      }));
  },
  getProjects: async () => {
    return await forecast.projects();
  },
});

export default useForecast;
