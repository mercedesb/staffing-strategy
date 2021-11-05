const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const corsConfig = require("./corsConfig");
const pipedrive = require("./lib/pipedrive");
const auth = require("./lib/auth");
const asyncHandler = require('express-async-handler')

// Routes
const authRouter = require("./routes/authRouter");
const assignmentsRouter = require("./routes/assignmentsRouter");
const peopleRouter = require("./routes/peopleRouter");
const projectsRouter = require("./routes/projectsRouter");
const scenariosRouter = require("./routes/scenariosRouter");

const { authenticateJWT } = auth();

const app = express();

// Middleware config
app.use(cors(corsConfig.default));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the React client
app.use(express.static(path.join(__dirname, "..", "build")));

app.use("/api/auth", authRouter);
app.use("/api/assignments", assignmentsRouter);
app.use("/api/people", peopleRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/scenarios", scenariosRouter);

/* DEALS */
app.get("/api/deals/current", authenticateJWT, asyncHandler(async (_req, res) => {
  const { getDeals } = pipedrive();
  const response = await getDeals();
  res.json(response);
}));

/* STAGES */
app.get("/api/stages/current", authenticateJWT, asyncHandler(async (_req, res) => {
  const { getStages } = pipedrive();
  const response = await getStages();
  res.json(response);
}));

// catch 404
app.use(function (req, res, next) {
  res.redirect("/");
});

// global error handler
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(500).send();
});

exports.app = app
