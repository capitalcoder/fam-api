const express = require("express");
const assign_router = express.Router();
const { Assignment } = require("./models");
const { SuccessResponse, ErrorResponse } = require("./commons");

// Create a new assignment
assign_router.post("/", async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res
      .status(201)
      .json(SuccessResponse(201, "Successfully add an assignment", asset));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to add an assignment", error.message));
  }
});

// Get all assignment
assign_router.get("/all", async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully load assignments", assignments));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load assignment", error.message));
  }
});

// Get a assignment by ID
assign_router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Assignment not found", null));
    }
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully load assignment", asset));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load assignment", error.message));
  }
});

// Update a assignment by ID
assign_router.put("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Assignment not found", null));
    }
    await assignment.update(req.body);
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully update assignment", assignment));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to update assignment", error.message));
  }
});

// Delete a assignment by ID
assign_router.delete("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Assignment not found", null));
    }
    await assignment.destroy();
    res
      .status(204)
      .json(SuccessResponse(204, "Successfully delete assignment", null));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to delete assignment", error.message));
  }
});

module.exports = { assign_router };
