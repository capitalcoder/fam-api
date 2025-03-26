const express = require("express");
const axios = require("axios");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const port = 3000;

// Proxy configurations for User Service and Order Service
const userServiceURL = "http://localhost:3001"; // User Service URL
const assetServiceURL = "http://localhost:3002"; // Asset Service URL

// Proxy for User Service
app.use(
  "/users",
  createProxyMiddleware({
    target: userServiceURL,
    changeOrigin: true,
    pathRewrite: {
      "^/users": "", // Remove '/users' from the URL path before forwarding to the User Service
    },
  })
);

// Proxy for Asset Service
app.use(
  "/assets",
  createProxyMiddleware({
    target: assetServiceURL,
    changeOrigin: true,
    pathRewrite: {
      "^/assets": "", // Remove '/assets' from the URL path before forwarding to the Asset Service
    },
  })
);

// Start the Gateway service
app.listen(port, () => {
  console.log(`API Gateway running on http://localhost:${port}`);
});
