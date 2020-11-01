import Forecast from "forecast-promise";

const forecast = new Forecast({
  accountId: process.env.REACT_APP_FORECAST_ACCOUNT_ID,
  token: process.env.REACT_APP_FORECAST_TOKEN,
});

const useForecast = () => ({
  getAssignments: async () => {
    const options = {
      startDate: new Date(),
    };
    return await forecast.assignments(options);
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
