const userController = require("../controllers/userController");



const router = require("express")();

//rotas usuário
router.post("/user", userController.create)

module.exports = router;