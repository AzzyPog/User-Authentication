const userController = require("../controllers/userController");



const router = require("express")();

//rotas usuário
router.post("/user", userController.create);
router.get("/user", userController.index);
router.get("/user/:id", userController.show);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.destroy);

module.exports = router;