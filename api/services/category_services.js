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

const remove = async (id) => {
    const category = await CategoryModel.findByIdAndDelete(id);
    if(!category) throw new Error("Category not found");
    return category;
}


const update = async (id, name, description) => {
    const category = await CategoryModel.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!category) throw new Error("Category not found");
    return category;
}

module.exports = {
    create,
    index,
    remove,
    update
};
