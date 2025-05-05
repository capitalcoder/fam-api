const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3004;

// Import routes
const { maintenance_router } = require("./maintenance-service");
const { vendor_router } = require("./vendor-service");

// middleware
app.use(bodyParser.json());

// Use routes
app.use("/maintenance", maintenance_router);
app.use("/maintenance-vendor", vendor_router);

// Start the server
app.listen(PORT, () => {
  console.log(`Maintenance Server is running at http://localhost:${PORT}`);
});
