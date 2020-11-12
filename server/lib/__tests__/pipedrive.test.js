const pipedrive = require("../pipedrive");
const restClient = require("../restClient");

jest.mock("../restClient", () => () => ({
  get: jest.fn().mockResolvedValue({
    data: {
      data: [
        {
          id: 1,
          title: "deal 1",
        },
        {
          id: null,
          title: "deal 2",
        },
      ],
    },
  }),
}));

describe("pipedrive", () => {
  describe("getDeals", () => {
    it("returns an array of deals", async () => {
      const { getDeals } = pipedrive();
      const actual = await getDeals();
      expect(actual).toBeInstanceOf(Array);
    });

    it("does not return deals without an id", async () => {
      const { getDeals } = pipedrive();
      const actual = await getDeals();
      expect(actual.length).toEqual(1);
    });

    it("returns the id as a string", async () => {
      const { getDeals } = pipedrive();
      const actual = await getDeals();
      actual.forEach((deal) => {
        expect(deal).toEqual(
          expect.objectContaining({
            id: expect.any(String),
          })
        );
      });
    });

    it("transposes the returned title to name", async () => {
      const { getDeals } = pipedrive();
      const actual = await getDeals();
      actual.forEach((deal) => {
        expect(deal).toEqual(
          expect.objectContaining({
            name: expect.any(String),
          })
        );
      });
    });
  });

  describe("getStages", () => {
    it("returns an array of stages", async () => {
      const { getStages } = pipedrive();
      const actual = await getStages();
      expect(actual).toBeInstanceOf(Array);
    });

    it("returns the id as a string", async () => {
      const { getStages } = pipedrive();
      const actual = await getStages();
      actual.forEach((stage) => {
        expect(stage).toEqual(
          expect.objectContaining({
            id: expect.any(String),
          })
        );
      });
    });
  });
});
