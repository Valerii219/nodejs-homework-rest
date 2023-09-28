const { Schema, model } = require("mongoose");

const Joi = require("joi");

const HandleMongooseError = require("../helpers/handleMongooseError.js");

const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
      },
    password: {
        type: String,
        minlength:6,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        match:emailValid,
        required: [true, 'Email is required'],
        unique: true,
      },


}, { versionKey: false, timestamps:true});

userSchema.post("save", HandleMongooseError) ;

const registerShema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().pattern(emailValid).required(),
    password:Joi.string().min(6).required(),
})

const loginShema = Joi.object({
    
    email:Joi.string().pattern(emailValid).required(),
    password:Joi.string().min(6).required(),
})

const schemas = {
    registerShema,
    loginShema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,


}
