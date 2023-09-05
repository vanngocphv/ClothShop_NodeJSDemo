//sequelize
const sequelize = require("../Config/sequelizeConfig");
const Sequelize = require("sequelize");

const contactUser = sequelize.define(
  //table or entity name;
  "contactUser",
  {
    contactUser_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: "Please enter your name, cannot be empty",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
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
        notNull: true,
        notEmpty: {
          msg: "Please enter your message, cannot be empty",
        },
      },
    },
  }
);

module.exports = contactUser;
