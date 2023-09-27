const{User} = require('../models/user');
const HttpError = require("../helpers/HttpError");

const ctrlWrapper = require("../helpers/ctrlWrapper")

const register = async(req, res) => {
const newUser = await User.create(req.body);
res.json({
    name:newUser.name,
    email:newUser.email,
    
})
}

module.exports = {
    register: ctrlWrapper(register),

}