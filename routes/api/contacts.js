const express = require("express");

const ctrl = require("../../controllers/contacts.js");

const {isValidId} = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validateBody");
const router = express.Router();
const {schemas} = require("../../models/contact");


router.get("/", ctrl.getAll);



router.get("/:id", isValidId, ctrl.getByContactId);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id", isValidId,  ctrl.deleteByContactId);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateByContactId);

// router.patch("/:id/favorite", isValidId,  ctrl.updateStatusContact);

module.exports = router;
