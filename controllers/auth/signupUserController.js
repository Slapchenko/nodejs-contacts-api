const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const signupUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw new Conflict("Email in use");

  const verificationToken = uuidv4();

  const avatarURL = gravatar.url(email);

  const newUser = new User({ email, avatarURL, verificationToken });

  newUser.setPassword(password);

  await newUser.save();

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signupUserController;
