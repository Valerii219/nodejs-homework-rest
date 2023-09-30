const Joi = require("joi");
const { Schema, model } = require("mongoose");

const HandleMongooseError = require("../helpers/handleMongooseError.js");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(18).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema
};

contactSchema.post("save", HandleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas
};
