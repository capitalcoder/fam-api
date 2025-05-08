const express = require("express");
const supplier_router = express.Router();
const { Supplier } = require("./models");

// Create a new assignment
supplier_router.post("/", async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json({
      response_code: "201",
      response_message: "Successfully add a new location",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      response_code: "400",
      response_message: "Failed to add new supplier",
      error: error.message,
    });
  }
});

// Get all supplier
supplier_router.get("/all", async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json({
      response_code: "201",
      response_message: "Successfully get all supplier",
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

// Get a supplier by ID
supplier_router.get("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({
        response_code: "404",
        response_message: "Supplier not found",
      });
    }
    res.json({
      response_code: "200",
      response_message: "Supplier found",
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

// Update a supplier by ID
supplier_router.put("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({
        response_code: "404",
        response_message: "Supplier not found",
      });
    }
    await Supplier.update(req.body);
    res.json({
      response_code: "200",
      response_message: "Supplier successfully updated",
      error: supplier,
    });
  } catch (error) {
    res.status(400).json({
      response_code: "400",
      response_message: "Couldn't update supplier",
      error: error.message,
    });
  }
});

// Delete a supplier by ID
supplier_router.delete("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({
        response_code: "404",
        response_message: "Supplier not found",
      });
    }
    await Supplier.destroy();
    res.status(204).json({
      response_code: "204",
      response_message: "Successfully delete supplier",
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Something went wrong. Couldn't delete supplier",
      error: error.message,
    });
  }
});

module.exports = { supplier_router };
