const express = require("express");
const location_router = express.Router();
const { Location } = require("./models");

// Create a new assignment
location_router.post("/", async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all location
location_router.get("/", async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a location by ID
location_router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ error: "location not found" });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a location by ID
location_router.put("/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ error: "location not found" });
    }
    await location.update(req.body);
    res.json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a location by ID
location_router.delete("/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ error: "location not found" });
    }
    await location.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = location_router;
