const { User } = require("../models/user");
const HttpError = require("../helpers/HttpError");
const bcrypt = require("bcryptjs");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res) =>{
    const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if(!passwordCompare){
    throw HttpError(401, "Email or password is wrong");
  }
  const token = "sds11ad.dad23sd.dasda13";
  
  res.json({
    token,
  })
}
module.exports = {
  register: ctrlWrapper(register),
};
