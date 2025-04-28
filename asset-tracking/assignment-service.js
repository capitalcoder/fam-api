const express = require("express");
const assign_router = express.Router();
const { Assignments } = require("./models");

// Create a new assignment
assign_router.post("/", async (req, res) => {
  try {
    const assignment = await Assignments.create(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all assignment
assign_router.get("/", async (req, res) => {
  try {
    const assignments = await Assignments.findAll();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a assignment by ID
assign_router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignments.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "assignment not found" });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a assignment by ID
assign_router.put("/:id", async (req, res) => {
  try {
    const assignment = await Assignments.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "assignment not found" });
    }
    await assignment.update(req.body);
    res.json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a assignment by ID
assign_router.delete("/:id", async (req, res) => {
  try {
    const assignment = await Assignments.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "assignment not found" });
    }
    await Assignments.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { assign_router };
