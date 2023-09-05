//get sequelize lib
const Sequelize = require("sequelize");
//get sequelizeConfig
const sequelize = require("../Config/sequelizeConfig");

const Cloth = sequelize.define(
  "cloth", //name of model
  //create column
  {
    cloth_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true, //auto increase because id
      allowNull: false, //not null
      primaryKey: true, //primary
    },
    name: { type: Sequelize.STRING, allowNull: false },
    image: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: true },
    type: { type: Sequelize.INTEGER, allowNull: false },

    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }
);
module.exports = Cloth;
