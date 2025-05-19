import express from "express";
import { Shifting, Asset } from "./models.js";
import { SuccessResponse, ErrorResponse } from "./commons.js";

const shifting_router = express.Router();

// Create a new asset
shifting_router.post("/", async (req, res) => {
  try {
    const shifting = await Shifting.create(req.body);
    res
      .status(201)
      .json(SuccessResponse(201, "Successfully move asset", shifting));
  } catch (error) {
    res
      .status(400)
      .json(ErrorResponse(400, "Failed to move asset", error.message));
  }
});

// Get all shifting
shifting_router.get("/all", async (req, res) => {
  try {
    const shiftings = await Shifting.findAll();
    res.status(200).json({
      response_code: "200",
      response_message: "Successfully get all shifting",
      data: shiftings,
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Something went wrong at server",
      error: error.message,
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
        response_message: "Asset shifting not found",
      });
    }
    res.json({
      response_code: "200",
      response_message: "Shifting found",
      data: shifting,
    });
  } catch (error) {
    res.status(500).json({
      response_code: "500",
      response_message: "Something went wrong",
      error: error.message,
    });
  }
});

/***
Update a shifting by ID
Suspended for a meantime, Shifting feature is about logging
So, update and delete is prohibited
You may activate this if in the future it is necessary
***/

// shifting_router.put("/:id", async (req, res) => {
//   try {
//     const shifting = await Shifting.findByPk(req.params.id);
//     if (!shifting) {
//       return res.status(404).json({
//         response_code: "404",
//         response_message: "Asset shifting not found",
//       });
//     }
//     await shifting.update(req.body);
//     res.json({
//       response_code: "200",
//       response_message: "Successfully update asset shifting",
//       data: shifting,
//     });
//   } catch (error) {
//     res.status(400).json({
//       response_code: "400",
//       response_message: "Failed to update asset shifting",
//       error: error.message,
//     });
//   }
// });

// shifting_router.delete("/:id", async (req, res) => {
//   try {
//     const shifting = await Shifting.findByPk(req.params.id);
//     if (!shifting) {
//       return res.status(404).json({
//         response_code: "404",
//         response_message: "Asset shifting not found",
//       });
//     }
//     await shifting.destroy();
//     res.status(204).json({
//       response_code: "204",
//       response_message: "Successfully delete shifting #" + req.params.id,
//       data: shifting,
//     });
//   } catch (error) {
//     res.status(500).json({
//       response_code: "500",
//       response_message: "Something went wrong at esrver",
//       error: error.message,
//     });
//   }
// });

export default shifting_router;
