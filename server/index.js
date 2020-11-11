require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const corsConfig = require("./corsConfig");
const airtable = require("./airtable");
const forecast = require("./forecast");
const pipedrive = require("./pipedrive");

// utils
const auth = require("./lib/auth");

// controllers
const authController = require("./controllers/authController");

const app = express();

// Middleware config
app.use(cors(corsConfig.default));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.options("*", cors());

// Serve the React client
app.use(express.static(path.join(__dirname, "..", "build")));

const { authenticateJWT } = auth();

/* AUTH */
app.post("/api/auth/google", authController.login);
app.post("/api/auth/logout", authController.logout);
app.post("/api/auth/refresh", authController.refresh);

/* ASSIGNMENTS */

// Create
app.post("/api/assignment", authenticateJWT, async (req, res) => {
  const { createAssignment } = airtable();
  const data = req.body;
  const response = await createAssignment(data);
  res.json(response);
});

// Read
app.get("/api/current-assignments", authenticateJWT, async (_req, res) => {
  const { getAssignments } = forecast();
  const response = await getAssignments();
  res.json(response);
});

app.get("/api/upcoming-assignments", authenticateJWT, async (_req, res) => {
  const { getAssignments } = airtable();
  const response = await getAssignments();
  res.json(response);
});

// Update
app.put("/api/assignment/:id", authenticateJWT, async (req, res) => {
  const { updateAssignment } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updateAssignment(id, data);
  res.json(response);
});

// Delete
app.delete("/api/assignment/:id", authenticateJWT, async (req, res) => {
  const { deleteAssignment } = airtable();
  const id = req.params.id;
  const response = await deleteAssignment(id);
  res.json(response);
});

/* PEOPLE */

// Create
app.post("/api/person", authenticateJWT, async (req, res) => {
  const { createPerson } = airtable();
  const data = req.body;
  const response = await createPerson(data);
  res.json(response);
});

// Read
app.get("/api/current-people", authenticateJWT, async (_req, res) => {
  const { getPeople } = forecast();
  const response = await getPeople();
  res.json(response);
});

app.get("/api/upcoming-people", authenticateJWT, async (_req, res) => {
  const { getPeople } = airtable();
  const response = await getPeople();
  res.json(response);
});

// Update
app.put("/api/person/:id", authenticateJWT, async (req, res) => {
  const { updatePerson } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updatePerson(id, data);
  res.json(response);
});

// Delete
app.delete("/api/person/:id", authenticateJWT, async (req, res) => {
  const { deletePerson } = airtable();
  const id = req.params.id;
  const response = await deletePerson(id);
  res.json(response);
});

/* PROJECTS */

// Create
app.post("/api/project", authenticateJWT, async (req, res) => {
  const { createProject } = airtable();
  const data = req.body;
  const response = await createProject(data);
  res.json(response);
});

// Read
app.get("/api/current-projects", authenticateJWT, async (_req, res) => {
  const { getProjects } = forecast();
  const response = await getProjects();
  res.json(response);
});

app.get("/api/upcoming-projects", authenticateJWT, async (_req, res) => {
  const { getProjects } = airtable();
  const response = await getProjects();
  res.json(response);
});

// Update
app.put("/api/project/:id", authenticateJWT, async (req, res) => {
  const { updateProject } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updateProject(id, data);
  res.json(response);
});

// Delete
app.delete("/api/project/:id", authenticateJWT, async (req, res) => {
  const { deleteProject } = airtable();
  const id = req.params.id;
  const response = await deleteProject(id);
  res.json(response);
});

/* SCENARIOS */

// Create
app.post("/api/scenario", authenticateJWT, async (req, res) => {
  const { createScenario } = airtable();
  const data = req.body;
  const response = await createScenario(data);
  res.json(response);
});

// Read
app.get("/api/upcoming-scenarios", authenticateJWT, async (_req, res) => {
  const { getScenarios } = airtable();
  const response = await getScenarios();
  res.json(response);
});

// Update
app.put("/api/scenario/:id", authenticateJWT, async (req, res) => {
  const { updateScenario } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updateScenario(id, data);
  res.json(response);
});

// Delete
app.delete("/api/scenario/:id", authenticateJWT, async (req, res) => {
  const { deleteScenario } = airtable();
  const id = req.params.id;
  const response = await deleteScenario(id);
  res.json(response);
});

/* DEALS */
app.get("/api/deals", authenticateJWT, async (_req, res) => {
  const { getDeals } = pipedrive();
  const response = await getDeals();
  res.json(response);
});

/* STAGES */
app.get("/api/stages", authenticateJWT, async (_req, res) => {
  const { getStages } = pipedrive();
  const response = await getStages();
  res.json(response);
});

// catch 404
app.use(function (req, res, next) {
  res.status(404).send();
});

// global error handler
app.use(function (err, req, res, next) {
  res.status(500).send();
});

const PORT = process.env.PORT || 5000;

// start express server
app.listen(PORT, () => console.log(`server started of port ${PORT}`));
