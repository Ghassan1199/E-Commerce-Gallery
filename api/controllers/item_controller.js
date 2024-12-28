const ItemServices = require("../services/item_services");
const parseHelper = require("../helpers/response_helper");

const create = async (req, res) => {
    try {
        const {name, description, sub_category_id} = req.body;
        const item = await ItemServices.create(name, description, sub_category_id);
        return parseHelper(res, 201, item, "created successfully");
    } catch (err) {
        return parseHelper(res, 400, null, err);
    }
}

const index = async (req, res) => {
    try {
        const items = await ItemServices.index();
        if (!items.length) throw new Error("There is no items yet");
        return parseHelper(res, 200, items, "returned successfully");
    } catch (err) {
        if (err.message === "There is no items yet")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 400, null, err);
    }
}

module.exports = {
    create,
    index
};