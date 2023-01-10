require("dotenv").config();

const { User } = require("../../models/user");

const bcrypt = require("bcrypt");

const { HttpError } = require("../../helpers");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;


const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    token,
  });
};

module.exports = login;
