const userController = require("../controllers/userController");
const authController = require("../controllers/AuthController");
const passport = require("passport");


const router = require("express")();
router.use("/private", passport.authenticate('jwt', {session: false}));

//rota de autenticação
router.post('/login', authController.login);

//rotas usuário
router.get('/private/getDetails', authController.getDetails);
router.post("/user", userController.create);
router.get("/user", userController.index);
router.get("/user/:id", userController.show);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.destroy);

module.exports = router;