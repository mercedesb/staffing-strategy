const axios = require("axios");

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const restClient = {
  get: async (url, headers = null) => {
    let requestHeaders = headers || defaultHeaders;
    return await axios.get(url, { headers: requestHeaders });
  },
  post: async (url, data, headers = null) => {
    let requestHeaders = headers || defaultHeaders;
    return await axios.post(url, data, { headers: requestHeaders });
  },
  put: async (url, data, headers = null) => {
    let requestHeaders = headers || defaultHeaders;
    return await axios.put(url, data, { headers: requestHeaders });
  },
  patch: async (url, data, headers = null) => {
    let requestHeaders = headers || defaultHeaders;
    return await axios.patch(url, data, { headers: requestHeaders });
  },
};

module.exports = restClient;
