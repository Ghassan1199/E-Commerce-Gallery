const express = require("express");
const categoryRouter = require("./category_routes");
const subCategoryRouter = require("./sub_category_routes");
const itemRouter = require("./item_routes");
const UserRouter = require("./user_routes");


const router = express.Router();

router.use("/category", categoryRouter);
router.use("/sub_category", subCategoryRouter);
router.use("/item", itemRouter);
router.use("/user", UserRouter);


module.exports = router;