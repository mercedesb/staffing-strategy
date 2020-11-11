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
      const stages = await get(
        `https://companydomain.pipedrive.com/api/v1/stages?api_token=${process.env.PIPE_DRIVE_API_TOKEN}`
      );
      return stages.data.data.map((s) => ({
        ...s,
        id: s.id.toString(),
      }));
    },
  };
};

module.exports = pipedrive;
