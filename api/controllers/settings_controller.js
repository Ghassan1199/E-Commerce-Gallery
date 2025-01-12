const settingsServices = require("../services/settings_services");
const parseHelper = require("../helpers/response_helper");

const create = async (req, res) => {
    try {
        const { dollar_price } = req.body;
        const settings = await settingsServices.create(dollar_price);
        return parseHelper(res, 201, settings, "created successfully");
    } catch (err) {
        return parseHelper(res, 400, null, err);
    }
}

const get = async (req, res) => {
    try {
        const settings = await settingsServices.get();
        if (!settings.length) throw new Error("There is no settings yet");
        return parseHelper(res, 200, settings, "returned successfully");
    } catch (err) {
        if (err.message === "There is no settings yet")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 400, null, err);
    }
}

const update_dollar_price = async (req, res) => {
    try {

        const { dollar_price } = req.body;
        const settings = await settingsServices.update_dollar_price(dollar_price);
        return parseHelper(res, 200, settings, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const add_hero_photo = async (req, res) => {
    try {
        const { files } = req.body;
        const settings = await settingsServices.add_photo_to_hero(files);
        return parseHelper(res, 201, settings, "added successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const remove_hero_photo = async (req,res)=>{
    try {
        const settings = await settingsServices.remove_hero_photo(req.params.index);
        return parseHelper(res, 204, settings, "deleted successfully");
    } catch (err) {
        console.log(err);
        if(err.message === "photo not found")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 500, null, err);
    }
}

module.exports = {
    create,
    get,
    update_dollar_price,
    add_hero_photo,
    remove_hero_photo
};