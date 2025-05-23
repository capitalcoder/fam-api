import express from "express";
import { Supplier } from "./models.js";
import { SuccessResponse, ErrorResponse } from "./commons.js";

const supplier_router = express.Router();

// Create a new assignment
supplier_router.post("/", async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res
      .status(201)
      .json(SuccessResponse(201, "Successfully add a supplier", supplier));
  } catch (error) {
    res
      .status(400)
      .json(ErrorResponse(400, "Failed to add a supplier", error.message));
  }
});

// Get all supplier
supplier_router.get("/all", async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json({
      response_code: "201",
      response_message: "Successfully get all supplier",
      data: suppliers,
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
      data: supplier,
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
    await supplier.destroy();
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

export default supplier_router;
