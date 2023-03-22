const sequelize = require("../config/sequelize");

(async() => {
    try {
        await sequelize.sync({ force: true});
        console.log("conexão estabelecida.");
    } catch (error) {
        console.log(error + "!");
    }
})();