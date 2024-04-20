const mainRoute = require("express").Router();

mainRoute.get("/", (req, res) => {
  res.status(200).send("<h1>The interface will be here soon</h1>");
});

module.exports = mainRoute;
