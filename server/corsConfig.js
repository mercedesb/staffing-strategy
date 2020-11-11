exports.default = {
  origin: !!process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : "",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
