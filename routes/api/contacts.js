const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/contacts.js");
const { schemas } = require("../../models/contact"); // Правильний імпорт
const { isValidId } = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");



router.get("/", authenticate, ctrl.getAll);



router.get("/:id", authenticate, isValidId, ctrl.getByContactId);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id", authenticate, isValidId,  ctrl.deleteByContactId);

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateByContactId);

router.patch("/:id/favorite", authenticate, isValidId,  ctrl.updateStatusContact);

module.exports = router;
