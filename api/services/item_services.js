const itemModel = require('../models/item_model');

const create = async (name, description, sub_category_id) => {
    const item = new itemModel({name: name, description: description, sub_category_id});
    await item.save();
    return item;
}

const index = async () => {
    return itemModel.find()
        .populate({
            path: 'sub_category_id',
            populate: {
                path: 'main_category_id'
            }
        });
}

module.exports = {
    create,
    index
};
