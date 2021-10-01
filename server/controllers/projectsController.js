const airtable = require("../lib/airtable");
const forecast = require("../lib/forecast");
const asyncHandler = require('express-async-handler')

exports.create = asyncHandler(async (req, res) => {
  const { createProject } = airtable();
  const data = req.body;
  const response = await createProject(data);
  res.json(response);
});

exports.current = asyncHandler(async (_req, res) => {
  const { getProjects } = forecast();
  const response = await getProjects();
  res.json(response);
});

exports.upcoming = asyncHandler(async (_req, res) => {
  const { getProjects } = airtable();
  const response = await getProjects();
  res.json(response);
});

exports.update = asyncHandler(async (req, res) => {
  const { updateProject } = airtable();
  const id = req.params.id;
  const data = req.body;
  const response = await updateProject(id, data);
  res.json(response);
});

exports.delete = asyncHandler(async (req, res) => {
  const { deleteProject, getAssignments, deleteAssignment } = airtable();
  const id = req.params.id;
  const response = await deleteProject(id);
  const assignments = await getAssignments();
  const projectAssignments = assignments.filter((a) => a.projectId === id);
  projectAssignments.forEach(async (pa) => await deleteAssignment(pa.id));

  res.json(response);
});
