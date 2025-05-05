const express = require("express");
const maintenance_router = express.Router();
const { Maintenance } = require("./models");

// Create a new assignment
maintenance_router.post("/", async (req, res) => {
  try {
    const maintenance = await Maintenance.create(req.body);
    res.status(201).json(maintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all maintenance
maintenance_router.get("/", async (req, res) => {
  try {
    const maintenances = await Maintenance.findAll();
    res.json(maintenances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a maintenance by ID
maintenance_router.get("/:id", async (req, res) => {
  try {
    const maintenance = await Maintenance.findByPk(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ error: "maintenance not found" });
    }
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a maintenance by ID
maintenance_router.put("/:id", async (req, res) => {
  try {
    const maintenance = await Maintenance.findByPk(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ error: "maintenance not found" });
    }
    await Maintenance.update(req.body);
    res.json(maintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a maintenance by ID
maintenance_router.delete("/:id", async (req, res) => {
  try {
    const maintenance = await Maintenance.findByPk(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ error: "maintenance not found" });
    }
    await Maintenance.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { maintenance_router };
