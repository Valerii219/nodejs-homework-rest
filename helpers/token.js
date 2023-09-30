const jwt = require("jsonwebtoken")
require("dotenv").config();

const {SECRET_KEY} = process.env;
const payload = {
  id:"6517e5999e2bde1df407a147"
}


const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"23h"});



module.exports = token;