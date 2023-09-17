const express = require("express");

const ctrl = require("../../controllers/contacts.js");

const {isValidId} = require('../../middlewares')
const router = express.Router();

router.get("/", ctrl.getAll);



router.get("/:contactId", isValidId, ctrl.getByContactId);

router.post("/", ctrl.add);

router.delete("/:id", isValidId,  ctrl.deleteByContactId);

router.put("/:id", isValidId,  ctrl.updateByContactId);

router.patch("/:id/favorite", isValidId,  ctrl.updateStatusContact);

module.exports = router;
