const { Contact } = require("../models/contact");

const checkContactOwner = async (req, res, next) => {
  const { user } = req; // Поточний користувач (залогінений)

  // Отримати ідентифікатор контакту з параметрів запиту
  const { id } = req.params;

  try {
    const contact = await Contact.findOne({ _id: id, owner: user._id });

    // Перевірити, чи контакт існує для даного користувача
    if (!contact) {
      return res.status(403).json({ message: "Access denied" });
    }

    next(); // Перейти до наступного middleware або обробки запиту
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkContactOwner };