const express = require("express");
const assignee_router = express.Router();
const { Assignee } = require("./models");

// Create a new assignee
assignee_router.post("/", async (req, res) => {
  try {
    const assignee = await Assignee.create(req.body);
    res.status(201).json({
      response_code: "201",
      response_message: "Successfully adds a new assignee",
      data: assignee,
    });
  } catch (error) {
    res.status(400).json({
      response_code: "400",
      response_message: "Failed to add new assignee",
      error: error.message,
    });
  }
});

// Get all assignee
assignee_router.get("/all", async (req, res) => {
  try {
    const assignees = await Assignee.findAll();
    res.json({
      response_code: "200",
      response_message: "Successfully loads all assignees",
      data: assignees,
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Something went wrong",
      error: error.message,
    });
  }
});

// Get a assignee by ID
assignee_router.get("/:id", async (req, res) => {
  try {
    const assignee = await Assignee.findByPk(req.params.id);
    if (!assignee) {
      return res
        .status(404)
        .json({
          response_code: "404",
          response_message: "assignee not found",
        });
    }
    res.json({
      response_code: "200",
      response_message: "assignee found",
      data: assignee,
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Something went wrong",
      error: error.message,
    });
  }
});

// Update a assignee by ID
assignee_router.put("/:id", async (req, res) => {
  try {
    const assignee = await Assignee.findByPk(req.params.id);
    if (!assignee) {
      return res
        .status(404)
        .json({
          response_code: "404",
          response_message: "assignee not found",
        });
    }
    await assignee.update(req.body);
    res.json({
      response_code: "200",
      response_message: "assignee successfully updated",
      data: assignee,
    });
  } catch (error) {
    res.status(400).json({
      response_code: "500",
      response_message: "Something went wrong",
      error: error.message,
    });
  }
});

// Delete a assignee by ID
assignee_router.delete("/:id", async (req, res) => {
  try {
    const assignee = await Assignee.findByPk(req.params.id);
    if (!assignee) {
      return res
        .status(404)
        .json({
          response_code: "404",
          response_message: "assignee not found",
        });
    }
    await assignee.destroy();
    res.status(204).json({
      response_code: "204",
      response_message: "Successfully delete assignee #" + req.params.id,
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

module.exports = { assignee_router };
