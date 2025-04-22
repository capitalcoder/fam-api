const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const https = require("https");
const fs = require("fs");
const { default: helmet } = require("helmet");
const verifyToken = require("./auth-middleware");

const app = express();
const port = 3443;

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

const userServiceURL = "http://localhost:3001/users";
const assetServiceURL = "http://localhost:3002/assets";
const depreciationServiceURL = "http://localhost:3003/depreciation";

const userProxy = createProxyMiddleware({
  target: userServiceURL,
  changeOrigin: true,
  pathRewrite: {
    "^/users": "", // Remove '/users' from the URL path before forwarding to the User Service
  },
});

const assetProxy = createProxyMiddleware({
  target: assetServiceURL,
  changeOrigin: true,
  pathRewrite: {
    "^/assets": "",
  },
});

const depreciationProxy = createProxyMiddleware({
  target: depreciationServiceURL,
  changeOrigin: true,
  pathRewrite: {
    "^/depreciation": "",
  },
});

app.disable("x-powered-by");
app.use(helmet());

app.use("/v1/users", userProxy);
app.use("/v1/assets", verifyToken, assetProxy);
app.use("/v1/depreciation", verifyToken, depreciationProxy);

https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});
