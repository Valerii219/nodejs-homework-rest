const jwt = require("jsonwebtoken")
require("dotenv").config();

const {SECRET_KEY} = process.env;
const payload = {
  id:"6515cf241c42efa7901aa92d"
}


const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"120h"});

// console.log(token);

module.exports = token;