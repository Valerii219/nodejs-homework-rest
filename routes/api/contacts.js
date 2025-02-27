const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/contacts.js");
const { addSchema, updateFavoriteSchema } = require("../../models/contact"); // Правильний імпорт
const { isValidId } = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");



router.get("/", authenticate, ctrl.getAll );

  router.get("/:id", authenticate,  validateBody(addSchema), isValidId, ctrl.getByContactId )

  router.delete("/:id", authenticate,  isValidId,  ctrl.deleteByContactId )

  router.post("/", authenticate,  ctrl.add)

router.put("/:id", authenticate, isValidId,  validateBody(addSchema), ctrl.updateByContactId )


  router.patch("/:id/favorite",  authenticate, validateBody(updateFavoriteSchema))

module.exports = router;
