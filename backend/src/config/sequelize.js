const { Sequelize } = require("sequelize");
require("./dotenv").configDotenv();
/*
const fs = require("fs");
const model = fs.readdirSync("./src/models", {withFileTypes: true})
.map(item => item.name.split(".")[0]);
*/


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_DATABASE
});
module.exports = sequelize;

require("../models/User");

// for (mod in sequelize.models) {
//     if (sequelize.models[mod].associate instanceof Function) {
//       sequelize.models[mod].associate(sequelize.models);
//     }
//   }

