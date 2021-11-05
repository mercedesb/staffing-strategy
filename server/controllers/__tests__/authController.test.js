const { app } = require("../../app");
const request = require("supertest");

describe("auth controller", () => {
  describe("clientCredentials", () => {
    it("returns the google client id and redirect URL", async () => {
      process.env.GOOGLE_OAUTH_CLIENT_ID = "testClientId";
      process.env.GOOGLE_OUAUTH_REDIRECT_URL = "testRedirectURL";

      const response = await request(app).get("/api/auth/clientCredentials").expect(200);

      expect(response.body).toEqual({ clientId: "testClientId", redirectURL: "testRedirectURL" });
    });
  });
});
