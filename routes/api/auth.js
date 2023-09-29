const express = require("express");

const {validateBody} = require("../../middlewares");

const {schemas} = require("../../models/user");

const ctrl = require("../../controllers/auth");


const router = express.Router();


// signUp
router.post("/users/register", validateBody(schemas.registerShema), ctrl.register);
// signin
router.post("/users/login", validateBody(schemas.loginShema), ctrl.login);

module.exports = router;