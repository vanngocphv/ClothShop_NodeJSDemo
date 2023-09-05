const express = require("express");

const viewEngineConfig = (app) => {
  //set static file
  app.use(express.static("./Public"));

  app.set("view engine", "ejs");
  app.set("views", "./src/Views");
};

module.exports = viewEngineConfig;
