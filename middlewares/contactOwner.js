const { Contact } = require("../models/contact");
const HttpError = require("../helpers/HttpError")
const checkContactOwner = async (req, res, next) => {
  const { user } = req; // Поточний користувач (залогінений)

  const { id } = req.params;

  if (id) {
    try {
      const contact = await Contact.findOne({ _id: id, owner: user._id });

      // Перевірити, чи контакт існує та чи є поточний користувач його власником
      if (!contact) {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch {
      next(HttpError(500, "Server error"));
    }
  }

  next(); // Перейти до наступного middleware або обробки запиту
};

module.exports = { checkContactOwner };