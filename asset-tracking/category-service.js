const express = require("express");
const category_router = express.Router();
const { Category } = require("./models");

// Create a new category
category_router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      response_code: "201",
      response_message: "Successfully adds a new category",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      error_code: "400",
      error_message: error.message,
    });
  }
});

// Get all category
category_router.get("/all", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({
      response_code: "200",
      response_message: "Successfully loads all of the categories",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      error_code: "500",
      error_message: error.message,
    });
  }
});

// Get a category by ID
category_router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({
        error_code: "404",
        error_message: "Specified category does not exist",
      });
    }
    res.json({
      response_code: "200",
      response_message: "Successfully get a category",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a category by ID
category_router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({
        error_code: "404",
        error_message: "Specified category does not exist",
      });
    }
    await category.update(req.body);
    res.status(200).json({
      response_code: "200",
      response_message: "Successfully update a category",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      error_code: "400",
      error_message: error.message,
    });
  }
});

// Delete a category by ID
category_router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({
        error_code: "404",
        error_message: "Specified category does not exist",
      });
    }
    await Category.destroy();
    res.status(204).json({
      response_code: "204",
      response_message: "Successfully delete category #" + req.params.id,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      error_code: "500",
      error_message: error.message,
    });
  }
});

module.exports = { category_router };
