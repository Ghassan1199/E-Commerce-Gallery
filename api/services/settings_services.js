const SettingsModel = require('../models/settings_model');

const create = async (dollar_price) => {
    const old = await SettingsModel.find();
    if(old.length > 0) {
        await SettingsModel.deleteMany()
        console.log("deleted successfully");
    }
    const settings = new SettingsModel({dollar_price});
    await settings.save();
    return settings;
}

const get = async () => {
    return SettingsModel.find();
}

const update = async ( dollar_price) => {
    const settings = await SettingsModel.findOne();
    settings.dollar_price = dollar_price;
    settings.save();
    return settings;
}

module.exports = {
    create,
    get,
    update
};
