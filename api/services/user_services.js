const UserModel = require('../models/user_model');
const jwt = require('jsonwebtoken');


const index = async () => {
    const User = UserModel.find();
    return User;
}

const login = async (user_name, password) => {

    const user = await UserModel.findOne({user_name});
    if (!user) {
        throw new Error('User does not exist');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign(
        {id: user._id, user_name: user.user_name, role: user.role},
        process.env.SECRET,
    );
    return {token,user};
}

const create = async (user_name, password,role) => {
    const userExists = await UserModel.findOne({user_name});
    if (userExists) {
        throw new Error('User already exists');
    }

    const user = new UserModel({user_name, password,role});
    await user.save();
    return user;
}

module.exports = {
    create,
    index,
    login
};
