const airtable = require("../lib/airtable");
const forecast = require("../lib/forecast");

exports.create = async (req, res) => {
  const { createPerson } = airtable();
  const data = req.body;
  const response = await createPerson(data);
  res.json(response);
};

exports.current = async (_req, res) => {
  const { getPeople } = forecast();
  const response = await getPeople();
  res.json(response);
};

exports.upcoming = async (_req, res) => {
  const { getPeople } = airtable();
  const response = await getPeople();
  res.json(response);
};

exports.update = async (req, res) => {
  const { updatePerson } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updatePerson(id, data);
  res.json(response);
};

exports.delete = async (req, res) => {
  const { deletePerson } = airtable();
  const id = req.params.id;
  const response = await deletePerson(id);
  res.json(response);
};
