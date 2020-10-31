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
    return await forecast.people();
  },
  getProjects: async () => {
    return await forecast.projects();
  },
});

export default useForecast;
