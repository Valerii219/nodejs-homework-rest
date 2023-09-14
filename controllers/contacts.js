const contacts = require("../models/contacts.js");
const HttpError = require("../helpers/HttpError.js");
const Joi = require("joi");

const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(18).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getByContactId = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, { message: "missing required name field" });
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteByContactId = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateByContactId = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getByContactId: ctrlWrapper(getByContactId),
  add: ctrlWrapper(add),
  deleteByContactId: ctrlWrapper(deleteByContactId),
  updateByContactId: ctrlWrapper(updateByContactId),
};
