const express = require("express");
const vendor_router = express.Router();
const { Vendor } = require("./models");

// Create a new assignment
vendor_router.post("/", async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all vendor
vendor_router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a vendor by ID
vendor_router.get("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: "vendor not found" });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a vendor by ID
vendor_router.put("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: "vendor not found" });
    }
    await Vendor.update(req.body);
    res.json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a vendor by ID
vendor_router.delete("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: "vendor not found" });
    }
    await Vendor.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { vendor_router };
