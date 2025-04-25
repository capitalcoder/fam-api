const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3002;

// Import routes
const assetRouter = require("./routes/asset_service");
const categoryRouter = require("./routes/category_service");
const locationRouter = require("./routes/location_service");
const assignmentRouter = require("./routes/assignment-service");
const supplierRouter = require("./routes/supplier-service");

// middleware
app.use(bodyParser.json());

// Use routes
app.use("/assets", assetRouter);
app.use("/assets/category", categoryRouter);
app.use("/assets/location", locationRouter);
app.use("/assets/assignment", assignmentRouter);
app.use("/assets/supplier", supplierRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
