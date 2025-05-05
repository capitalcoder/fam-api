const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3002;

// Import routes
const { asset_router } = require("./asset-service");
const { category_router } = require("./category-service");
const { location_router } = require("./location-service");
const { assign_router } = require("./assignment-service");
const { supplier_router } = require("./supplier-service");
const { shifting_router } = require("./shifting-service");

// middleware
app.use(bodyParser.json());

// Use routes
app.use("/assets", asset_router);
app.use("/assets/category", category_router);
app.use("/assets/location", location_router);
app.use("/assets/assignment", assign_router);
app.use("/assets/supplier", supplier_router);
app.use("/assets/shift", shifting_router);

// Start the server
app.listen(PORT, () => {
  console.log(`Asset tracking services are running at http://localhost:${PORT}`);
});
