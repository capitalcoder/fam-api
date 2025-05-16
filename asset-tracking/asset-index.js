import express from "express";
import bodyParser from "body-parser";

import asset_router from "./asset-service.js";
import category_router from "./category-service.js";
import location_router from "./location-service.js";
import assignee_router from "./assignee-service.js";
import supplier_router from "./supplier-service.js";
import shifting_router from "./shifting-service.js";
import assign_router from "./assignment-service.js";

const app = express();
const PORT = process.env.PORT || 3002;

// Import routes

// middleware
app.use(bodyParser.json());

// Use routes
app.use("/assets/", asset_router);
app.use("/assets/category/", category_router);
app.use("/assets/location/", location_router);
app.use("/assets/assignment/", assign_router);
app.use("/assets/assignee/", assignee_router);
app.use("/assets/supplier/", supplier_router);
app.use("/assets/shift/", shifting_router);

// Start the server
app.listen(PORT, () => {
  console.log(
    `Asset tracking services are running at http://localhost:${PORT}`
  );
});
