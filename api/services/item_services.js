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


const update = async (id, name, description, price, images, sub_category_id, main_category_id) => {
    // Find the item by ID
    const item = await itemModel.findById(id);
    if (!item) throw new Error("Item not found");

    // Update the fields of the item
    item.name = name || item.name;
    item.description = description || item.description;
    item.price = price || item.price;
    item.sub_category_id = sub_category_id || item.sub_category_id;
    item.main_category_id = main_category_id || item.main_category_id;

    // Handle image updates
    if (images && images.length > 0) {
        // Delete old images from Cloudinary
        for (const image of item.images) {
            await deleteFileFromCloudinary(image);
        }

        // Clear the old images array
        item.images = [];

        // Add new images
        for (const image of images) {
            const url = await saveFileToCloudinary(path.join(uploadPath, image.fileName));
            item.images.push(url);
        }
    }

    // Save the updated item
    await item.save();

    return item;
};

module.exports = {
    create,
    index,
    remove,
    update
};
