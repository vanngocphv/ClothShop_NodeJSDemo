//get sequelize lib
const Sequelize = require("sequelize");
//get sequelizeConfig
const sequelizeConfig = require("../Config/sequelizeConfig");

const ClothCategory = sequelizeConfig.define(
  "clothCategory", //name of model
  //create column
  {
    clothCategoryId: {
      type: Sequelize.INTEGER,
      autoIncrement: true, //auto increase because id
      allowNull: false, //not null
      primaryKey: true, //primary
    },
    name: { type: Sequelize.STRING, allowNull: false },
  }
);
module.exports = ClothCategory;
