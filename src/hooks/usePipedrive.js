import { useApi } from "react-use-fetch-api";

const usePipedrive = () => {
  const { get } = useApi();

  return {
    getDeals: async () => {
      return get(
        `https://companydomain.pipedrive.com/api/v1//pipelines/1/deals?start=0&api_token=${process.env.REACT_APP_PIPE_DRIVE_API_TOKEN}`
      );
    },
    getStages: async () => {
      return get(
        `https://companydomain.pipedrive.com/api/v1/stages?api_token=${process.env.REACT_APP_PIPE_DRIVE_API_TOKEN}`
      );
    },
  };
};

export default usePipedrive;
