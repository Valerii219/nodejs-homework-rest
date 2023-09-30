const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/contacts.js");
const { shemy } = require("../../models/contact"); 
const { isValidId } = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");
console.log(shemy);


router.get("/", authenticate, ctrl.getAll);



router.get("/:id", authenticate, isValidId, ctrl.getByContactId);

router.post("/", authenticate, validateBody(shemy.addSchema), ctrl.add);
console.log(shemy.addSchema);

router.delete("/:id", authenticate, isValidId,  ctrl.deleteByContactId);

router.put("/:id", authenticate, isValidId, validateBody(shemy.addSchema), ctrl.updateByContactId);

router.patch("/:id/favorite", authenticate, isValidId,  ctrl.updateStatusContact);

module.exports = router;
