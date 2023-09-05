// Include Sequelize module.
const Sequelize = require("sequelize");

const sequelize = require("../Config/sequelizeConfig");

const User = sequelize.define("user", {
  user_id: {
    type: Sequelize.INTEGER,

    autoIncrement: true,

    allowNull: false,

    primaryKey: true,
  },

  name: { type: Sequelize.STRING, allowNull: false },

  email: { type: Sequelize.STRING, allowNull: false },

  myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = User;
