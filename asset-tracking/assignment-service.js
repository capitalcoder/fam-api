const express = require("express");
const assign_router = express.Router();
const { Assignment } = require("./models");

// Create a new assignment
assign_router.post("/", async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json({
      response_code: "201",
      response_message: "Successfully adds a new assignment",
      data: assignment,
    });
  } catch (error) {
    res.status(400).json({
      response_code: "400",
      response_message: "Failed to add new assignment",
      error: error.message,
    });
  }
});

// Get all assignment
assign_router.get("/all", async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res.json({
      response_code: "200",
      response_message: "Successfully loads all assignments",
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Something went wrong",
      error: error.message,
    });
  }
});

// Get a assignment by ID
assign_router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res
        .status(404)
        .json({
          response_code: "404",
          response_message: "Assignment not found",
        });
    }
    res.json({
      response_code: "200",
      response_message: "Assignment found",
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Something went wrong",
      error: error.message,
    });
  }
});

// Update a assignment by ID
assign_router.put("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res
        .status(404)
        .json({
          response_code: "404",
          response_message: "Assignment not found",
        });
    }
    await assignment.update(req.body);
    res.json({
      response_code: "200",
      response_message: "Assignment successfully updated",
      data: assignment,
    });
  } catch (error) {
    res.status(400).json({
      response_code: "500",
      response_message: "Something went wrong",
      error: error.message,
    });
  }
});

// Delete a assignment by ID
assign_router.delete("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res
        .status(404)
        .json({
          response_code: "404",
          response_message: "Assignment not found",
        });
    }
    await assignment.destroy();
    res.status(204).json({
      response_code: "204",
      response_message: "Successfully delete assignment #" + req.params.id,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = { assign_router };
