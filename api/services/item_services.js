const itemModel = require('../models/item_model');
const {saveFileToCloudinary, uploadPath, deleteFileFromCloudinary} = require("../helpers/file_helpers");
const path = require("path");
const ItemModel = require("../models/item_model");

const create = async (name, description, price, images, sub_category_id, main_category_id) => {
    const item = await new itemModel({name, price, description, sub_category_id, main_category_id});

    for (const image in images) {
        const url = await saveFileToCloudinary(path.join(uploadPath, images[image].fileName));
        item.images.push(url);
    }
    await item.save();
    return item;
}

const index = async (main_category_id, sub_category_id, max_price, min_price) => {
    // Build the filter object
    const filter = {};

    if (main_category_id) {
        filter.main_category_id = main_category_id;
    }
    if (sub_category_id) {
        filter.sub_category_id = sub_category_id;
    }
    if (max_price) {
        filter.price = { ...filter.price, $lte: max_price };
    }
    if (min_price) {
        filter.price = { ...filter.price, $gte: min_price };
    }

    return itemModel.find(filter)
        .populate('main_category_id')
        .populate('sub_category_id');
};

const remove = async (id) => {
    const item = await ItemModel.findByIdAndDelete(id);
    if (!item) throw new Error("Item not found");
    for (const image of item.images) {
        await deleteFileFromCloudinary(image);
    }
    return item;
}

const getById = async (id) => {
    return ItemModel.findById(id)
        .populate('main_category_id')
        .populate('sub_category_id');
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

    await item.save();

    return item;
};

module.exports = {
    create,
    index,
    remove,
    update,
    getById
};
