const express = require("express");
const ItemController = require("../controllers/item_controller.js");
const itemRouter = express.Router();

itemRouter.post('/', ItemController.create);
itemRouter.get("/", ItemController.index)


module.exports = itemRouter;