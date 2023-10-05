const { Contact } = require("../models/contact");
const HttpError = require("../helpers/HttpError");

const getOwner = async (req, res, next) => {
  try {
    // Знайдемо всі контакти, які належать поточному користувачу
    const contacts = await Contact.find({ owner: req.user._id });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getIdOwner = async (req, res, next) => {
  const contactId = req.params.id;

  try {
    // Знайдемо контакт за ідентифікатором, який належить поточному користувачу
    const contact = await Contact.findOne({ _id: contactId, owner: req.user._id });

    if (!contact) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteIdOwner = async (req, res, next) => {
  const contactId = req.params.id;

  try {
    // Знайдемо та видалимо контакт за ідентифікатором, який належить поточному користувачу
    const result = await Contact.deleteOne({ _id: contactId, owner: req.user._id });

    if (result.deletedCount === 0) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const postOwner = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const putIdOwner = async (req, res, next) => {
  const contactId = req.params.id;
  const updatedContactData = req.body;

  try {
    // Оновимо контакт за ідентифікатором, який належить поточному користувачу
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user._id },
      updatedContactData,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const patchFavoriteOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = updateFavoriteSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw HttpError(404, "Not Found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getOwner, getIdOwner, deleteIdOwner, postOwner, putIdOwner, patchFavoriteOwner  };