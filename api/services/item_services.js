const itemModel = require('../models/item_model');
const {saveFileToCloudinary, uploadPath,deleteFileFromCloudinary} = require("../helpers/file_helpers");
const path = require("path");
const ItemModel = require("../models/item_model");

const create = async (name, description, price,images, sub_category_id, main_category_id) => {
    const item = await new itemModel({ name,price,description, sub_category_id, main_category_id});

    for (const image in images) {
        const url = await saveFileToCloudinary(path.join(uploadPath, images[image].fileName));
        item.images.push(url);
    }
    await item.save();
    return item;
}

const index = async () => {
    return itemModel.find()
        .populate('main_category_id')
        .populate('sub_category_id');
}

const remove = async (id) => {
    const item = await ItemModel.findByIdAndDelete(id);
    if(!item) throw new Error("Item not found");
    for (const image of item.images){
        await deleteFileFromCloudinary(image);
    }
    return item;
}

module.exports = {
    create,
    index,
    remove,
};
