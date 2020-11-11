const restClient = require("./restClient");
const { get } = restClient();

const pipedrive = () => {
  return {
    getDeals: async () => {
      const deals = await get(
        `https://companydomain.pipedrive.com/api/v1//pipelines/1/deals?start=0&api_token=${process.env.PIPE_DRIVE_API_TOKEN}`
      );
      return deals.data.data
        .filter((d) => !!d.id)
        .map((d) => ({
          ...d,
          id: d.id.toString(),
          name: d.title,
        }));
    },
    getStages: async () => {
      return get(`https://companydomain.pipedrive.com/api/v1/stages?api_token=${process.env.PIPE_DRIVE_API_TOKEN}`);
    },
  };
};

module.exports = pipedrive;
