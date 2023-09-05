//just for sequelize, the database will always open when the server has been started

const Sequelize = require("sequelize");
const sequelize = new Sequelize("NodeJSDb", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
