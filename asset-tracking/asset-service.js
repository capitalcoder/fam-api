const express = require("express");
const asset_router = express.Router();
const { Asset } = require("./models");

// Create a new asset
asset_router.post("/", async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json({
      response_code: "201",
      response_message: "Berhasil mendaftarkan aset baru",
      data: asset,
    });
  } catch (error) {
    res.status(400).json({
      error_code: "400",
      error_message: "Gagal mendaftarkan aset: " + error.message,
    });
  }
});

// Get all asset
asset_router.get("/", async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res
      .status(200)
      .json({
        response_code: "200",
        response_message: "Berhasil mengambil semua data aset",
        data: assets,
      });
  } catch (error) {
    res.status(500).json({
      error_code: "500",
      error_message: error.message,
    });
  }
});

// Get a asset by ID
asset_router.get("/:id", async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({
        response_code: "404",
        response_message: "Aset tidak ditemukan",
      });
    }
    res.json({
      response_code: "200",
      response_message: "Aset ditemukan",
      data: asset,
    });
  } catch (error) {
    res.status(500).json({
      error_code: "500",
      error_message: error.message,
    });
  }
});

// Update a asset by ID
asset_router.put("/:id", async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({
        response_code: "404",
        response_message: "The specified asset does not exist",
      });
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
      return res.status(404).json({
        response_code: "404",
        response_message: "The specified asset does not exist",
      });
    }
    await asset.destroy();
    res.status(204).json({
      response_code: "204",
      response_message: "Successfully delete asset #" + req.params.id,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      error_code: "500",
      error_message: error.message,
    });
  }
});

module.exports = { asset_router };
