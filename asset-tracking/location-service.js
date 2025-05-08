const express = require("express");
const location_router = express.Router();
const { Location } = require("./models");

// Create a new location
location_router.post("/", async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json({
      response_code: "201",
      response_message: "Successfully add a new location",
      data: location,
    });
  } catch (error) {
    res.status(400).json({
      response_code: "400",
      response_message: "Failed to add new location",
      error: error.message,
    });
  }
});

// Get all location
location_router.get("/all", async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json({
      response_code: "201",
      response_message: "Successfully get all location",
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Something went wrong at server",
      error: error.message,
    });
  }
});

// Get a location by ID
location_router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({
        response_code: "404",
        response_message: "Location not found",
      });
    }
    res.json({
      response_code: "200",
      response_message: "Location found",
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Something went wrong at server",
      error: error.message,
    });
  }
});

// Update a location by ID
location_router.put("/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({
        response_code: "404",
        response_message: "Location not found",
      });
    }
    await location.update(req.body);
    res.json({
      response_code: "200",
      response_message: "Location successfully updated",
      error: location,
    });
  } catch (error) {
    res.status(400).json({
      response_code: "400",
      response_message: "Couldn't update location",
      error: error.message,
    });
  }
});

// Delete a location by ID
location_router.delete("/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({
        response_code: "404",
        response_message: "Location not found",
      });
    }
    await location.destroy();
    res.status(204).json({
      response_code: "204",
      response_message: "Successfully delete location",
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Couldn't delete location. Something went wrong",
      error: error.message,
    });
  }
});

module.exports = { location_router };
