//just using for update and sync table in mysql
const sequelize = require("./src/Config/sequelizeConfig");

// const ClothCategory = require("./src/Models/clothCategory");
// const Cloth = require("./src/Models/cloth");
// const contactUser = require("./src/Models/contactUser");
const Order = require("./src/Models/order");

// ClothCategory.hasMany(Cloth);
// Cloth.belongsTo(ClothCategory);

//create table
// sequelize.sync();
//force sync all
sequelize.sync({ force: true });
