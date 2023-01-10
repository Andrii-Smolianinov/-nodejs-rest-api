const { User } = require("../../models/user");

const gravatar = require("gravatar");

const bcrypt = require("bcrypt");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hachPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hachPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
  });
};

module.exports = register;
