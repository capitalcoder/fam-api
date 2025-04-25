const express = require("express");
const asset_router = express.Router();
const { Asset } = require("./models");

// Create a new asset
asset_router.post("/", async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all asset
asset_router.get("/", async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a asset by ID
asset_router.get("/:id", async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: "Asset  not found" });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a asset by ID
asset_router.put("/:id", async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: "asset  not found" });
    }
    await asset.update(req.body);
    res.json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a asset by ID
asset_router.delete("/:id", async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: "asset  not found" });
    }
    await asset.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = asset_router;
