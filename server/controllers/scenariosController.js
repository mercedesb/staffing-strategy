const airtable = require("../lib/airtable");

exports.create = async (req, res) => {
  const { createScenario } = airtable();
  const data = req.body;
  const response = await createScenario(data);
  res.json(response);
};

exports.upcoming = async (_req, res) => {
  const { getScenarios } = airtable();
  const response = await getScenarios();
  res.json(response);
};

exports.update = async (req, res) => {
  const { updateScenario } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updateScenario(id, data);
  res.json(response);
};

exports.delete = async (req, res) => {
  const { deleteScenario } = airtable();
  const id = req.params.id;
  const response = await deleteScenario(id);
  res.json(response);
};
