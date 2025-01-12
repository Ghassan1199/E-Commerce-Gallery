const SettingsModel = require('../models/settings_model');
const { saveFileToCloudinary, uploadPath, deleteFileFromCloudinary } = require("../helpers/file_helpers");


const get = async () => {
    return SettingsModel.find();
}

const update_dollar_price = async (dollar_price) => {
    settings = await SettingsModel.findOne();
    if (!settings)
        settings = new SettingsModel.create()
    settings.dollar_price = dollar_price;
    settings.save();
    return settings;
}

const add_photo_to_hero = async (images) => {
    const settings = await SettingsModel.findOne();
    if (!settings)
        settings = new SettingsModel.create()

    for (const image in images) {
        const { url } = await saveFileToCloudinary(images[image].buffer);
        settings.hero.push(url);
    }

    settings.save();
    return settings;

}


const remove_hero_photo = async (index) => {
    const settings = await SettingsModel.findOne();
    if (!settings.hero[index]) throw new Error("photo not found");
    await deleteFileFromCloudinary(settings.hero[index]);
    settings.hero.pop(index);
    await settings.save();
    return settings;
}

module.exports = {
    get,
    update_dollar_price,
    add_photo_to_hero,
    remove_hero_photo
};
