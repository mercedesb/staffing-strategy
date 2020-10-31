import Forecast from "forecast-promise";

const forecast = new Forecast({
  accountId: process.env.REACT_APP_FORECAST_ACCOUNT_ID,
  token: process.env.REACT_APP_FORECAST_TOKEN,
});

const useForecast = () => ({
  getProjects: async () => {
    return await forecast.projects();
  },
  getPeople: async () => {
    return await forecast.people();
  },
});

export default useForecast;
