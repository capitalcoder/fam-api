import express from "express";
import { Assignee } from "./models.js";
import { SuccessResponse, ErrorResponse } from "./commons.js";

const assignee_router = express.Router();

// Create a new assignee
assignee_router.post("/", async (req, res) => {
  try {
    const assignee = await Assignee.create(req.body);
    res
      .status(201)
      .json(SuccessResponse(201, "Successfully add assignee", assignee));
  } catch (error) {
    res
      .status(400)
      .json(ErrorResponse(400, "Failed to add new assignee", error.message));
  }
});

// Get all assignee
assignee_router.get("/all", async (req, res) => {
  try {
    const assignees = await Assignee.findAll();
    res.status(200).json(
      SuccessResponse(200, "Successfully loads all assignees", assignees)
    );
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load assignees", error.message));
  }
});

// Get a assignee by ID
assignee_router.get("/:id", async (req, res) => {
  try {
    const assignee = await Assignee.findByPk(req.params.id);
    if (!assignee) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Assignee not found", null));
    }
    res.status(200).json(SuccessResponse(200, "Assignee found", assignee));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Cannot Find Assignee", error.message));
  }
});

// Update a assignee by ID
assignee_router.put("/:id", async (req, res) => {
  try {
    const assignee = await Assignee.findByPk(req.params.id);
    if (!assignee) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Assignee not found", null));
    }
    await assignee.update(req.body);
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully Update Assignee", assignee));
  } catch (error) {
    res
      .status(400)
      .json(ErrorResponse(400, "Cannot Update Assignee", error.message));
  }
});

// Delete a assignee by ID
assignee_router.delete("/:id", async (req, res) => {
  try {
    const assignee = await Assignee.findByPk(req.params.id);
    if (!assignee) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Assignee not found", null));
    }
    let assgn = assignee.name;
    await assignee.destroy();
    res
      .status(204)
      .json(SuccessResponse(204, "Successfully Delete Assignee", assgn));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Cannot Delete Assignee", error.message));
  }
});

export default assignee_router;
