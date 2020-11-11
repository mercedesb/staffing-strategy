const jwt = require("jsonwebtoken");

// adds the user to the `req` param in routes
// helpful if we want additional auth by role
const auth = () => {
  return {
    authenticateJWT: (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }

          req.user = user;
          next();
        });
      } else {
        res.sendStatus(401);
      }
    },
  };
};

module.exports = auth;
