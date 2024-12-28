const SubCategoryModel = require('../models/sub_category_model');

const create = async (name, description, main_category_id) => {
    const subCategory = new SubCategoryModel({name: name, description: description, main_category_id});
    await subCategory.save();
    return subCategory;
}

const index = async () => {
    return SubCategoryModel.find().populate("main_category_id");
}

module.exports = {
    create,
    index
};
