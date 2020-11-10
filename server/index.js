require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const airtable = require("./airtable");
const forecast = require("./forecast");
const pipedrive = require("./pipedrive");

const app = express();

// Middleware config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the React client
app.use(express.static(path.join(__dirname, "..", "build")));

/* ASSIGNMENTS */

// Create
app.post("/assignment", async (req, res) => {
  const { createAssignment } = airtable();
  const data = req.body;
  const response = await createAssignment(data);
  res.json(response);
});

// Read
app.get("/current-assignments", async (_req, res) => {
  const { getAssignments } = forecast();
  const response = await getAssignments();
  res.json(response);
});

app.get("/upcoming-assignments", async (_req, res) => {
  const { getAssignments } = airtable();
  const response = await getAssignments();
  res.json(response);
});

// Update
app.put("/assignment/:id", async (req, res) => {
  const { updateAssignment } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updateAssignment(id, data);
  res.json(response);
});

// Delete
app.delete("/assignment/:id", async (req, res) => {
  const { deleteAssignment } = airtable();
  const id = req.params.id;
  const response = await deleteAssignment(id);
  res.json(response);
});

/* PEOPLE */

// Create
app.post("/person", async (req, res) => {
  const { createPerson } = airtable();
  const data = req.body;
  const response = await createPerson(data);
  res.json(response);
});

// Read
app.get("/current-people", async (_req, res) => {
  const { getPeople } = forecast();
  const response = await getPeople();
  res.json(response);
});

app.get("/upcoming-people", async (_req, res) => {
  const { getPeople } = airtable();
  const response = await getPeople();
  res.json(response);
});

// Update
app.put("/person/:id", async (req, res) => {
  const { updatePerson } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updatePerson(id, data);
  res.json(response);
});

// Delete
app.delete("/person/:id", async (req, res) => {
  const { deletePerson } = airtable();
  const id = req.params.id;
  const response = await deletePerson(id);
  res.json(response);
});

/* PROJECTS */

// Create
app.post("/project", async (req, res) => {
  const { createProject } = airtable();
  const data = req.body;
  const response = await createProject(data);
  res.json(response);
});

// Read
app.get("/current-projects", async (_req, res) => {
  const { getProjects } = forecast();
  const response = await getProjects();
  res.json(response);
});

app.get("/upcoming-projects", async (_req, res) => {
  const { getProjects } = airtable();
  const response = await getProjects();
  res.json(response);
});

// Update
app.put("/project/:id", async (req, res) => {
  const { updateProject } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updateProject(id, data);
  res.json(response);
});

// Delete
app.delete("/project/:id", async (req, res) => {
  const { deleteProject } = airtable();
  const id = req.params.id;
  const response = await deleteProject(id);
  res.json(response);
});

/* SCENARIOS */

// Create
app.post("/scenario", async (req, res) => {
  const { createScenario } = airtable();
  const data = req.body;
  const response = await createScenario(data);
  res.json(response);
});

// Read
app.get("/upcoming-scenarios", async (_req, res) => {
  const { getScenarios } = airtable();
  const response = await getScenarios();
  res.json(response);
});

// Update
app.put("/scenario/:id", async (req, res) => {
  const { updateScenario } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updateScenario(id, data);
  res.json(response);
});

// Delete
app.delete("/scenario/:id", async (req, res) => {
  const { deleteScenario } = airtable();
  const id = req.params.id;
  const response = await deleteScenario(id);
  res.json(response);
});

/* DEALS */
app.get("/deals", async (_req, res) => {
  const { getDeals } = pipedrive();
  const response = await getDeals();
  res.json(response);
});

/* STAGES */
app.get("/stages", async (_req, res) => {
  const { getStages } = pipedrive();
  const response = await getStages();
  res.json(response);
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
