const CategoryModel = require('../models/category_model');

const create = async (name, description) => {
    const Category = new CategoryModel({name: name, description: description});
    await Category.save();
    return Category;
}

const index = async () => {
    const Categories = CategoryModel.find();
    return Categories;
}

module.exports = {
    create,
    index
};
