const express = require("express");
const subCategoryController = require("../controllers/sub_category_controller.js");
const subCategoryRouter = express.Router();

subCategoryRouter.post('/', subCategoryController.create);
subCategoryRouter.get("/", subCategoryController.index)


module.exports = subCategoryRouter;