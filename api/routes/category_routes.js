const express = require("express");
const categoryController = require("../controllers/category_controller.js");
const categoryRouter = express.Router();

categoryRouter.post('/', categoryController.create);
categoryRouter.get("/", categoryController.index)


module.exports = categoryRouter;