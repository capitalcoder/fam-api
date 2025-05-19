import express from "express";
import { Location } from "./models.js";
import { SuccessResponse, ErrorResponse } from "./commons.js";

const location_router = express.Router();

// Create a new location
location_router.post("/", async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res
      .status(201)
      .json(SuccessResponse(201, "Successfully add a location", location));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to add a location", error.message));
  }
});

// Get all location
location_router.get("/all", async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(SuccessResponse(200, "Successfully load locations", locations));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to delete a location", error.message));
  }
});

// Get a location by ID
location_router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Location not found", null));
    }
    res.status(200).json(SuccessResponse(200, "Successfully grab a location", location));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load a location", error.message));
  }
});

// Update a location by ID
location_router.put("/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Location not found", null));
    }
    await location.update(req.body);
    res.json(SuccessResponse(201, "Successfully update a location", location));
  } catch (error) {
    res
      .status(400)
      .json(ErrorResponse(500, "Failed to update a location", error.message));
  }
});

// Get a location by parent
location_router.get("/by-parent/:id", async (req, res) => {
  try {
    let locationParent = req.params.id;
    const location = await Location.findAll({
      where: { parent: locationParent },
    });
    if (!location) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Location not found", null));
    }
    res.status(200).json(SuccessResponse(200, "Successfully load locations", location));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load a location", error.message));
  }
});

// Delete a location by ID
location_router.delete("/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Location not found", null));
    }
    await location.destroy();
    res
      .status(204)
      .json(SuccessResponse(204, "Successfully delete a location", null));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to delete a location", error.message));
  }
});

export default location_router;
