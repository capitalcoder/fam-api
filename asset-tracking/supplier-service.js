const express = require("express");
const supplier_router = express.Router();
const { Supplier } = require("./models");

// Create a new assignment
supplier_router.post("/", async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all supplier
supplier_router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a supplier by ID
supplier_router.get("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a supplier by ID
supplier_router.put("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "supplier not found" });
    }
    await Supplier.update(req.body);
    res.json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a supplier by ID
supplier_router.delete("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "supplier not found" });
    }
    await Supplier.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = supplier_router;
