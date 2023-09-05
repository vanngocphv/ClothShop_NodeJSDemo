//get require sequelize
const sequelize = require("../Config/sequelizeConfig");
const Sequelize = require("sequelize");

const order = sequelize.define(
  "Order", //table / entity name
  {
    order_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name",
        },
        notEmpty: {
          msg: "Please enter your name, cannot be empty",
        },
      },
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        emailValid(value) {
          const regex = /\S+@\S+\.\S+/;
          if (!regex.test(value)) {
            throw new Error("Need a email value");
          }
        },
      },
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your message",
        },
        notEmpty: {
          msg: "Please enter your message, cannot be empty",
        },
      },
    },
    products: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your products in cart",
        },
        notEmpty: {
          msg: "Please enter your products, cannot be empty",
        },
      },
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your total amount",
        },
        notEmpty: {
          msg: "Please enter your total amount, cannot be empty",
        },
      },
    },
  }
);

module.exports = order;
