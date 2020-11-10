const Forecast = require("forecast-promise");
const dayjs = require("dayjs");

const forecastApi = new Forecast({
  accountId: process.env.FORECAST_ACCOUNT_ID,
  token: process.env.FORECAST_TOKEN,
});

const forecast = () => ({
  getAssignments: async () => {
    const options = {
      startDate: new Date(),
    };
    const assignments = await forecastApi.assignments(options);
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
    const people = await forecastApi.people();
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
    const projects = await forecastApi.projects();
    return projects
      .filter((p) => !!p.id)
      .map((p) => ({
        ...p,
        id: p.id.toString(),
        name: `${p.code} - ${p.name}`,
      }));
  },
});

module.exports = forecast;
