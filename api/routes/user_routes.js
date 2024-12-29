const express = require("express");
const UserController = require("../controllers/user_controller");
const UserRouter = express.Router();


UserRouter.post('/register', UserController.create);
UserRouter.post("/login", UserController.login)
UserRouter.get("/", UserController.index)

module.exports = UserRouter;