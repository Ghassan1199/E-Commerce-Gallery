const CategoryModel = require('../models/category_model');
const { saveFileToCloudinary } = require('../helpers/file_helpers');

const create = async (name, description, image) => {
    const { url } = await saveFileToCloudinary(image.buffer);
    const Category = new CategoryModel({ name: name, description: description, image: url });
    await Category.save();
    return Category;
}

const index = async () => {
    const Categories = CategoryModel.find();
    return Categories;
}

const remove = async (id) => {
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) throw new Error("Category not found");
    return category;
}


const update = async (id, name, description, image) => {
    const { url } = await saveFileToCloudinary(image.buffer);
    const category = await CategoryModel.findByIdAndUpdate(id, { name, description, image:url }, { new: true });
    if (!category) throw new Error("Category not found");
    return category;
}

module.exports = {
    create,
    index,
    remove,
    update
};
