const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
    },

    description: {
        type: String,
    },

    images: {
        type: [String],
    },

    main_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },

    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sub_category',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});



const ItemModel = mongoose.model('item', ItemSchema);

module.exports = ItemModel;
