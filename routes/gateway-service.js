const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const https = require("https");
const fs = require("fs");
// const { default: helmet } = require("helmet");
const verifyToken = require("./auth-middleware");

const app = express();
const port = 3443;

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

const userServiceURL = "http://localhost:3001/users";
const assetServiceURL = "http://localhost:3002/assets";

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

// app.disable("x-powered-by");
// app.use(helmet());
// app.use((req, res, next) => {
//   res.status(404).send("Sorry can't find the page!");
// });
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res
//     .status(500)
//     .send("Something broke! behind Please contact the system administrator.");
// });

app.use("/v1/users", userProxy);
app.use("/v1/assets", assetProxy);

https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});
