const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

const google = require("../lib/google");
const airtable = require("../lib/airtable");

const { getProfileInfo } = google();
const { getUserByEmail, updateUser } = airtable();

exports.login = async (req, res) => {
  try {
    const code = req.body.code;
    const profile = await getProfileInfo(code);
    const user = await getUserByEmail(profile.email);

    if (!!user) {
      // expire in 15 min
      const expiration = dayjs().add(15, "minutes");

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
        expiresAt: expiration.valueOf(),
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
      return res.sendStatus(403);
    }

    const databaseUser = await getUserByEmail(user.email);
    if (!databaseUser) {
      return res.sendStatus(403);
    }

    if (databaseUser.refreshToken !== token) {
      return res.sendStatus(403);
    }

    // expire in 15 min
    const expiration = dayjs().add(15, "minutes");

    const accessToken = jwt.sign(
      {
        exp: expiration.unix(),
        id: user.id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      accessToken,
      expiresAt: expiration.valueOf(),
    });
  });
};

exports.logout = async (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    updateUser(user.id, { refreshToken: null });

    res.send("Logout successful");
  });
};
