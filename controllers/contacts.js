const { Contact } = require("../models/contact");
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const { addSchema, updateFavoriteSchema } = require("../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email");
  res.json(result);
};

const getContactByIdAndOwner = async (id, ownerId) => {
  const contact = await Contact.findOne({ _id: id, owner: ownerId });
  if (!contact) {
    throw HttpError(403, "Access denied"); // Контакт не знайдений або не належить користувачеві
  }
  return contact;
};

const getByContactId = async (req, res) => {
  const { id } = req.params;
  const { _id: ownerId } = req.user;

  const contact = await getContactByIdAndOwner(id, ownerId);

  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;

  // Спочатку перевіряємо власність контакта
  const contact = await getContactByIdAndOwner(req.body.id, owner);

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteByContactId = async (req, res) => {
  const { id } = req.params;
  const { _id: ownerId } = req.user;

  // Спочатку перевіряємо власність контакта
  const contact = await getContactByIdAndOwner(id, ownerId);

  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

const updateByContactId = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { id } = req.params;
  const { _id: ownerId } = req.user;

  // Спочатку перевіряємо власність контакта
  const contact = await getContactByIdAndOwner(id, ownerId);

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const { _id: ownerId } = req.user;

  // Спочатку перевіряємо власність контакта
  const contact = await getContactByIdAndOwner(id, ownerId);

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
};