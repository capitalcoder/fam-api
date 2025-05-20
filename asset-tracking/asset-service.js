import express from "express";
import { Asset, Assignee, Category, Location, Supplier } from "./models.js";
import { SuccessResponse, ErrorResponse } from "./commons.js";

const asset_router = express.Router();

// Create a new asset
asset_router.post("/", async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res
      .status(201)
      .json(SuccessResponse(201, "Successfully add an asset", asset));
  } catch (error) {
    res
      .status(400)
      .json(ErrorResponse(400, "Failed to add an asset", error.message));
  }
});

// Get all asset
asset_router.get("/", async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully load assets", assets));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load assets", error.message));
  }
});

// Get a asset by ID
asset_router.get("/:id", async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json(ErrorResponse(400, "Asset not found", null));
    }
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully load an asset", asset));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load an asset", error.message));
  }
});

// Get a asset by Location
asset_router.get("/at-location/:id", async (req, res) => {
  try {
    let locationId = req.params.id;
    const asset = await Asset.findAll({
      where: { LocationId: locationId },
      include: [Category, Location, Assignee, Supplier],
    });
    if (!asset) {
      return res
        .status(404)
        .json(ErrorResponse(400, "Asset not found at that location", null));
    }
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully load an asset", asset));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load an asset", error.message));
  }
});

// Get a asset by Category
asset_router.get("/by-category/:id", async (req, res) => {
  try {
    let categoryId = req.params.id;
    const asset = await Asset.findAll({
      where: { CategoryId: categoryId },
      include: [Category, Location, Assignee, Supplier],
    });
    if (!asset) {
      return res
        .status(404)
        .json(ErrorResponse(400, "Asset not found by that category", null));
    }
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully load an asset", asset));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load an asset", error.message));
  }
});

// Get a asset by Supplier
asset_router.get("/by-supplier/:id", async (req, res) => {
  try {
    let supplierId = req.params.id;
    const asset = await Asset.findAll({
      where: { SupplierId: supplierId },
      include: [Category, Location, Assignee, Supplier],
    });
    if (!asset) {
      return res
        .status(404)
        .json(ErrorResponse(400, "Asset not found by that supplier", null));
    }
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully load an asset", asset));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load an asset", error.message));
  }
});

// Get a asset by Assignee
asset_router.get("/by-assignee/:id", async (req, res) => {
  try {
    let assigneeId = req.params.id;
    const asset = await Asset.findAll({
      where: { AssigneeId: assigneeId },
      include: [Category, Location, Assignee, Supplier],
    });
    if (!asset) {
      return res
        .status(404)
        .json(ErrorResponse(400, "Asset not found by that assignee", null));
    }
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully load an asset", asset));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to load an asset", error.message));
  }
});

// Update an asset
asset_router.put("/:id", async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json(ErrorResponse(400, "Asset not found", null));
    }
    await asset.update(req.body);
    res
      .status(200)
      .json(SuccessResponse(200, "Successfully update an asset", asset));
  } catch (error) {
    res
      .status(400)
      .json(ErrorResponse(400, "Failed to update an asset", error.message));
  }
});

// Delete a asset by ID
asset_router.delete("/:id", async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).json(ErrorResponse(404, "Asset not found", null));
    }
    let asstn = asset.name;
    await asset.destroy();
    res
      .status(204)
      .json(SuccessResponse(204, "Successfully delete an asset", asstn));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "Failed to delete an asset", error.message));
  }
});

export default asset_router;
