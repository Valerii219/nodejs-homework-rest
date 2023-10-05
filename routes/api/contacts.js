const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/contacts.js");
const { addSchema } = require("../../models/contact"); // Правильний імпорт
const { isValidId } = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");
const  {getOwner, getIdOwner, deleteIdOwner, postOwner, putIdOwner, patchFavoriteOwner }  = require("../../middlewares/contactOwner");


router.get("/", authenticate, getOwner,  ctrl.getAll );

  router.get("/:id", authenticate, getIdOwner,  validateBody(addSchema), isValidId, ctrl.getByContactId )

  router.delete("/:id", authenticate, deleteIdOwner, isValidId,  ctrl.deleteByContactId )

  router.post("/", authenticate, postOwner,  ctrl.add)

router.put("/:id", authenticate, putIdOwner, isValidId,  validateBody(addSchema), ctrl.updateByContactId )


  router.patch("/:id/favorite", patchFavoriteOwner, authenticate)

module.exports = router;
