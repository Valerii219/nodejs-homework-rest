const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/contacts.js");
const { addSchema } = require("../../models/contact"); // Правильний імпорт
const { isValidId } = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");
const  {checkContactOwner}  = require("../../middlewares/contactOwner");



router.get("/", checkContactOwner, authenticate, ctrl.getAll);

router.get("/:id", authenticate, checkContactOwner, validateBody(addSchema), isValidId, ctrl.getByContactId);

router.post("/", authenticate, checkContactOwner,   ctrl.add);

router.delete("/:id", authenticate, isValidId, checkContactOwner, ctrl.deleteByContactId);

router.put("/:id", authenticate, isValidId, checkContactOwner, validateBody(addSchema), ctrl.updateByContactId);

router.patch("/:id/favorite", authenticate, checkContactOwner, isValidId,  ctrl.updateStatusContact);

module.exports = router;
