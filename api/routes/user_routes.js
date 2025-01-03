const express = require("express");
const UserController = require("../controllers/user_controller");
const UserRouter = express.Router();


UserRouter.post('/register', UserController.create);
UserRouter.post("/login", UserController.login)
UserRouter.get("/", UserController.index)
UserRouter.delete("/:id",UserController.remove);
UserRouter.put("/:id", UserController.update);

module.exports = UserRouter;