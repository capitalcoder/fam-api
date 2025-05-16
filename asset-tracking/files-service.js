const express = require("express");
const file_router = express.Router();
const { Category } = require("./models");
const { SuccessResponse, ErrorResponse } = require("./commons");

// Create a new category
file_router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res
      .status(201)
      .json(SuccessResponse(201, "Successfully add an category", category));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to add a category", error.message));
  }
});

// Get all category
file_router.get("/all", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully load categories", categories));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load categories", error.message));
  }
});

// Get a category by ID
file_router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Category not found", null));
    }
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully load a category", category));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load a category", error.message));
  }
});

// Update a category by ID
file_router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Category not found", null));
    }
    await category.update(req.body);
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully update a category", category));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to update a category", error.message));
  }
});

// Delete a category by ID
file_router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json(ErrorResponse(404, "Category not found", null));
    }
    let catnm = category.name;
    await category.destroy();
    res
      .status(204)
      .json(SuccessResponse(204, "Successfully delete a category", catnm));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to delete a category", error.message));
  }
});

module.exports = { file_router };
