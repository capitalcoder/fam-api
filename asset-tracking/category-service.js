import express from "express";
import { Category } from "./models.js";
import { SuccessResponse, ErrorResponse } from "./commons.js";
import { Op } from "sequelize";

const category_router = express.Router();

// Create a new category
category_router.post("/", async (req, res) => {
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
category_router.get("/all", async (req, res) => {
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

// ------------------------ Building Tree - Start ------------------------
function buildTree(items) {
  const idToNodeMap = {};
  const roots = [];

  items.forEach((item) => {
    idToNodeMap[item.code] = { id: item.code, label: item.name, children: [] };
  });

  // Link children to parents
  items.forEach((item) => {
    if (item.parent === "000") {
      roots.push(idToNodeMap[item.code]); // Root node
    } else {
      if (idToNodeMap[item.parent]) {
        idToNodeMap[item.parent].children.push(idToNodeMap[item.code]);
      }
    }
  });

  return roots;
}

category_router.get("/roots", async (req, res) => {
  try {
    let items = [];
    const categories = await Category.findAll();
    // extract the data
    categories.map((category) => {
      let item = category.dataValues;
      items.push(item);
    });
    // build the tree
    const tree = buildTree(items);
    // present the result
    res
      .status(200)
      .json(
        SuccessResponse(200, "Successfully build tree of categories", tree)
      );
  } catch (error) {
    res
      .status(500)
      .json(
        ErrorResponse(500, "Failed to build tree of categories", error.message)
      );
  }
});
// ------------------------ Building Tree - End ------------------------

// Get a category by ID
category_router.get("/:id", async (req, res) => {
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

// Get a category by ID
category_router.get("/by-parent/:id", async (req, res) => {
  try {
    let parentId = req.params.id;
    console.log("Categpry Parent: " + parentId);
    const category = await Category.findAll({ where: { parent: parentId } });
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
category_router.put("/:id", async (req, res) => {
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
category_router.delete("/:id", async (req, res) => {
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

export default category_router;
