const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    dollar_price:{
        type: Number,
        required: true,
        default: 0
    },
    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sub_category',
    },
    hero:{
        type:[String],
    },
    about_us :{
        type: String,
        default:"this is about_us"
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


const SettingsModel = mongoose.model('settings', SettingsSchema);

module.exports = SettingsModel;
