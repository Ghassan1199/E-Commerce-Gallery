const UserServices = require("../services/user_services");
const jwt = require('jsonwebtoken');

const parseHelper = require("../helpers/response_helper");


const index = async (req, res) => {
    try {
        const categories = await UserServices.index();
        if (!categories.length) throw new Error("There is no users yet");
        return parseHelper(res, 200, categories, "returned successfully");
    } catch (err) {
        if (err.message === "There is no users yet")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 400, null, err);
    }
}

const login = async (req, res) => {
    try {
        const {user_name, password} = req.body;
        const user = await UserServices.login(user_name, password);
        return parseHelper(res, 200, user, "returned successfully");
    } catch (err) {
        if (err.message === "User does not exist")
            return parseHelper(res, 404, null, err.message);

        if (err.message === "Invalid credentials")
            return parseHelper(res, 403, null, err.message);

        console.log(err)
        return parseHelper(res, 500, null, err);
    }
}

const create = async (req, res) => {
    try {
        const {user_name, password,role} = req.body;
        const category = await UserServices.create(user_name, password,role);
        return parseHelper(res, 201, category, "created successfully");
    } catch (err) {
        if (err.message === 'User already exists')
            return parseHelper(res, 400, null, err.message);
        console.log(err)
        return parseHelper(res, 500, null, err);
    }
}

module.exports = {
    create,
    index,
    login,
};