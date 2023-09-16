const express = require("express");

const ctrl = require("../../controllers/contacts.js");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getByContactId);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.deleteByContactId);

router.put("/:contactId", ctrl.updateByContactId);

module.exports = router;
