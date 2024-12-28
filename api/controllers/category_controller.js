const CategoryServices = require("../services/Category_services");
const parseHelper = require("../helpers/response_helper");

const create = async (req, res) => {
    try {
        const {name, description} = req.body;
        const category = await CategoryServices.create(name, description);
        return parseHelper(res, 201, category, "created successfully");
    } catch (err) {
        return parseHelper(res, 400, null, err);
    }
}

const index = async (req, res) => {
    try {
        const categories = await CategoryServices.index();
        if (!categories.length) throw new Error("There is no categories yet");
        return parseHelper(res, 200, categories, "returned successfully");
    } catch (err) {
        if (err.message === "There is no categories yet")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 400, null, err);
    }

}

module.exports = {
    create,
    index
};