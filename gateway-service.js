const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const userServiceURL = "http://localhost:3001/users";
const assetServiceURL = "http://localhost:3002/assets"; // Asset Service URL

const userProxy = createProxyMiddleware({
  target: userServiceURL,
  changeOrigin: true,
});

const assetProxy = createProxyMiddleware({
  target: assetServiceURL,
  changeOrigin: true,
});

app.use("/v1/users", userProxy);
app.use("/v1/assets", assetProxy);
app.listen(3000);
