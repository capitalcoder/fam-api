const express = require("express");
const shifting_router = express.Router();
const { Shifting } = require("./models");

// Create a new asset
shifting_router.post("/", async (req, res) => {
  try {
    const shifting = await Shifting.create(req.body);
    res.status(201).json({
      response_code: "201",
      response_message: "Berhasil mancatat perpindahan aset",
      data: shifting,
    });
  } catch (error) {
    res.status(400).json({
      error_code: "400",
      error_message: "Gagal mencatat perpindahan aset: " + error.message,
    });
  }
});

// Get all shifting
shifting_router.get("/", async (req, res) => {
  try {
    const shiftings = await Shifting.findAll();
    res
      .status(200)
      .json({
        response_code: "200",
        response_message: "Berhasil mengambil semua catatan perpindahan aset",
        data: shiftings,
      });
  } catch (error) {
    res.status(500).json({
      error_code: "500",
      error_message: error.message,
    });
  }
});

// Get a shifting by ID
shifting_router.get("/:id", async (req, res) => {
  try {
    const shifting = await Shifting.findByPk(req.params.id);
    if (!shifting) {
      return res.status(404).json({
        response_code: "404",
        response_message: "Catatan perpindahan tidak ditemukan",
      });
    }
    res.json({
      response_code: "200",
      response_message: "Catatan perpindahan ditemukan",
      data: shifting,
    });
  } catch (error) {
    res.status(500).json({
      error_code: "500",
      error_message: error.message,
    });
  }
});

// Update a shifting by ID
shifting_router.put("/:id", async (req, res) => {
  try {
    const shifting = await Shifting.findByPk(req.params.id);
    if (!shifting) {
      return res.status(404).json({
        response_code: "404",
        response_message: "Catatan perpindahan tidak ditemukan",
      });
    }
    await Shifting.update(req.body);
    res.json(shifting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a shifting by ID
shifting_router.delete("/:id", async (req, res) => {
  try {
    const asset = await Shifting.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json({
        response_code: "404",
        response_message: "Catatan perpindahan tidak ditemukan",
      });
    }
    await Shifting.destroy();
    res.status(204).json({
      response_code: "204",
      response_message: "Berhasil menghapus perpindahan #" + req.params.id,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      error_code: "500",
      error_message: error.message,
    });
  }
});

module.exports = { shifting_router };
