const express = require("express");
const normalRouter = require("./src/Routes/router");
const apiRouter = require("./src/Routes/api");
const viewEngineConfig = require("./src/Config/viewEngineConfig");
const app = express();

//parse value from request post into body parser
app.use(express.urlencoded({ extended: false }));
//middleware for json
app.use(express.json());

//config view engine
viewEngineConfig(app);

//handle router
app.use("/", normalRouter);
app.use("/api", apiRouter);

//just for wrong link
app.use("*", (req, res) => {
  res.send(`
        <h1> Error 404 </h1>
        <a href="/"> back </a>
    `);
});

app.listen(5000, () => {
  console.log("Web has been listened on port 5000...");
});
