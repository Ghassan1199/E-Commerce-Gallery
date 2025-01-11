const settingsServices = require("../services/settings_services");
const parseHelper = require("../helpers/response_helper");

const create = async (req, res) => {
    try {
        const {dollar_price} = req.body;
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

const update = async (req, res) => {
    try {

        const {dollar_price} = req.body;
        const settings = await settingsServices.update(dollar_price);
        return parseHelper(res, 200, settings, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}


module.exports = {
    create,
    get,
    update
};