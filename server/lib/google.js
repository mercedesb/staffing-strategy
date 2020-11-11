const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_SECRET,
  process.env.GOOGLE_OUAUTH_REDIRECT_URL
);

const google = () => {
  return {
    getProfileInfo: async (code) => {
      const r = await client.getToken(code);
      const idToken = r.tokens.id_token;

      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      return payload;
    },
  };
};

module.exports = google;
