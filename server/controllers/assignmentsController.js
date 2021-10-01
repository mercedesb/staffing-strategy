const airtable = require("../lib/airtable");
const forecast = require("../lib/forecast");
const asyncHandler = require('express-async-handler')

exports.create = asyncHandler(async (req, res) => {
  const { createAssignment } = airtable();
  const data = req.body;
  const response = await createAssignment(data);
  res.json(response);
});

exports.current = asyncHandler(async (_req, res) => {
  const { getAssignments } = forecast();
  const response = await getAssignments();
  res.json(response);
});

exports.upcoming = asyncHandler(async (_req, res) => {
  const { getAssignments } = airtable();
  const response = await getAssignments();
  res.json(response);
});

exports.update = asyncHandler(async (req, res) => {
  const { updateAssignment } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updateAssignment(id, data);
  res.json(response);
});

exports.delete = asyncHandler(async (req, res) => {
  const { deleteAssignment } = airtable();
  const id = req.params.id;
  const response = await deleteAssignment(id);
  res.json(response);
});
