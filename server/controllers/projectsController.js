const airtable = require("../lib/airtable");
const forecast = require("../lib/forecast");

exports.create = async (req, res) => {
  const { createProject } = airtable();
  const data = req.body;
  const response = await createProject(data);
  res.json(response);
};

exports.current = async (_req, res) => {
  const { getProjects } = forecast();
  const response = await getProjects();
  res.json(response);
};

exports.upcoming = async (_req, res) => {
  const { getProjects } = airtable();
  const response = await getProjects();
  res.json(response);
};

exports.update = async (req, res) => {
  const { updateProject } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updateProject(id, data);
  res.json(response);
};

exports.delete = async (req, res) => {
  const { deleteProject } = airtable();
  const id = req.params.id;
  const response = await deleteProject(id);
  res.json(response);
};
