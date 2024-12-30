const express = require("express");
const ItemController = require("../controllers/item_controller.js");
const busboy = require("../middlewares/busboy_middleware");

const itemRouter = express.Router();

itemRouter.post('/', busboy.bus, ItemController.create);
itemRouter.get("/", ItemController.index)
itemRouter.delete("/:id", ItemController.remove);
itemRouter.put("/:id", busboy.bus,ItemController.update);

module.exports = itemRouter;