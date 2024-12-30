const express = require("express");
const categoryController = require("../controllers/category_controller.js");
const categoryRouter = express.Router();

categoryRouter.post('/', categoryController.create);
categoryRouter.get("/", categoryController.index)
categoryRouter.delete("/:id", categoryController.remove);
categoryRouter.put("/:id", categoryController.update);

module.exports = categoryRouter;