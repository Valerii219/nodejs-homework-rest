const {Contact} = require("../models/contact");

const HttpError = require("../helpers/HttpError.js");

const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const {shemas} = require("../models/contact")



const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getByContactId = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findOne({_id:contactId});
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { error } = shemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, { message: "missing required name field" });
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteByContactId = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateByContactId = async (req, res) => {
  const { error } = shemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new:true}) ;
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { error } = shemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new:true}) ;
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
  updateStatusContact:ctrlWrapper(updateStatusContact),
};
