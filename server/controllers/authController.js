const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

const google = require("../lib/google");
const airtable = require("../lib/airtable");

const { getProfileInfo } = google();
const { getUserByEmail, updateUser } = airtable();

const baseAuthResponse = (user) => {
  const expiryInMinutes = parseInt(process.env.ACCESS_TOKEN_EXPIRY_IN_MINUTES) || 15;
  const expiration = dayjs().add(expiryInMinutes, "minutes");

  // generate an access token
  const accessToken = jwt.sign(
    {
      // registered claim `exp` is **seconds** since Epoch
      exp: expiration.unix(),
      id: user.id,
      email: user.email,
      // firstName: profile.given_name,
      // profilePic: profile.picture,
      // name: profile.name,
      // lastName: profile.family_name,
    },
    process.env.ACCESS_TOKEN_SECRET
  );

  return {
    accessToken,
    expiresAt: expiration.valueOf(),
  };
};

exports.clientCredentials = async (req, res) => {
  res.json({ clientId: process.env.GOOGLE_OAUTH_CLIENT_ID, redirectURL: process.env.GOOGLE_OUAUTH_REDIRECT_URL });
};

exports.login = async (req, res) => {
  try {
    const code = req.body.code;
    const profile = await getProfileInfo(code);
    const user = await getUserByEmail(profile.email);

    if (!!user) {
      const { accessToken, expiresAt } = baseAuthResponse(user);
      const refreshToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.REFRESH_TOKEN_SECRET
      );

      updateUser(user.id, { refreshToken });

      res.json({
        accessToken,
        refreshToken,
        expiresAt,
      });
    } else {
      throw Error(`${profile.email} is not authorized`);
    }

    res.send();
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
};

exports.refresh = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }

    const databaseUser = await getUserByEmail(user.email);
    if (!databaseUser) {
      return res.sendStatus(401);
    }

    if (databaseUser.refreshToken !== token) {
      return res.sendStatus(401);
    }

    const { accessToken, expiresAt } = baseAuthResponse(user);

    res.json({
      accessToken,
      expiresAt,
    });
  });
};

exports.logout = async (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }

    updateUser(user.id, { refreshToken: null });

    res.send("Logout successful");
  });
};
