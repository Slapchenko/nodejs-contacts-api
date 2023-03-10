const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("User not found");
  }

  const validPassword = user.comparePassword(password);
  if (!validPassword) {
    throw new Unauthorized("Email or password is wrong");
  }

  if (!user.verify) {
    throw new Unauthorized("User is not verified");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = loginUserController;
