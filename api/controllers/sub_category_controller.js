const SubCategoryServices = require("../services/sub_category_services");
const parseHelper = require("../helpers/response_helper");

const create = async (req, res) => {
    try {
        const {name, description, main_category_id} = req.body;
        const category = await SubCategoryServices.create(name, description, main_category_id);
        return parseHelper(res, 201, category, "created successfully");
    } catch (err) {
        return parseHelper(res, 400, null, err);
    }
}

const index = async (req, res) => {
    try {
        const subCategories = await SubCategoryServices.index();
        if (!subCategories.length) throw new Error("There is no sub_categories yet");
        return parseHelper(res, 200, subCategories, "returned successfully");
    } catch (err) {
        if (err.message === "There is no sub_categories yet")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 400, null, err);
    }
}

module.exports = {
    create,
    index
};