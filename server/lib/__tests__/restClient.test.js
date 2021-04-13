const restClient = require("../restClient");
const axios = require("axios");

let url;
let data;
let headers;

beforeEach(() => {
  url = "url";
  data = {
    id: "id",
  };
});

describe("restClient", () => {
  describe("get", () => {
    beforeEach(() => {
      jest.spyOn(axios, "get").mockResolvedValue({});
    });

    describe("when headers are passed in", () => {
      it("calls axios with those headers", async () => {
        headers = { custom: "headers" };
        await restClient.get(url, headers);
        expect(axios.get).toHaveBeenCalledWith(url, expect.objectContaining({ headers: headers }));
      });
    });

    describe("when there are no headers", () => {
      it("calls axios with default headers", async () => {
        await restClient.get(url);
        expect(axios.get).toHaveBeenCalledWith(url, expect.objectContaining({ headers: expect.any(Object) }));
      });
    });
  });

  describe("post", () => {
    beforeEach(() => {
      jest.spyOn(axios, "post").mockResolvedValue({});
    });

    describe("when headers are passed in", () => {
      it("calls axios with those headers", async () => {
        headers = { custom: "headers" };
        await restClient.post(url, data, headers);
        expect(axios.post).toHaveBeenCalledWith(url, data, expect.objectContaining({ headers: headers }));
      });
    });

    describe("when there are no headers", () => {
      it("calls axios with default headers", async () => {
        await restClient.post(url, data);
        expect(axios.post).toHaveBeenCalledWith(url, data, expect.objectContaining({ headers: expect.any(Object) }));
      });
    });
  });

  describe("put", () => {
    beforeEach(() => {
      jest.spyOn(axios, "put").mockResolvedValue({});
    });

    describe("when headers are passed in", () => {
      it("calls axios with those headers", async () => {
        headers = { custom: "headers" };
        await restClient.put(url, data, headers);
        expect(axios.put).toHaveBeenCalledWith(url, data, expect.objectContaining({ headers: headers }));
      });
    });

    describe("when there are no headers", () => {
      it("calls axios with default headers", async () => {
        await restClient.put(url, data);
        expect(axios.put).toHaveBeenCalledWith(url, data, expect.objectContaining({ headers: expect.any(Object) }));
      });
    });
  });

  describe("patch", () => {
    beforeEach(() => {
      jest.spyOn(axios, "patch").mockResolvedValue({});
    });

    describe("when headers are passed in", () => {
      it("calls axios with those headers", async () => {
        headers = { custom: "headers" };
        await restClient.patch(url, data, headers);
        expect(axios.patch).toHaveBeenCalledWith(url, data, expect.objectContaining({ headers: headers }));
      });
    });

    describe("when there are no headers", () => {
      it("calls axios with default headers", async () => {
        await restClient.patch(url, data);
        expect(axios.patch).toHaveBeenCalledWith(url, data, expect.objectContaining({ headers: expect.any(Object) }));
      });
    });
  });
});
