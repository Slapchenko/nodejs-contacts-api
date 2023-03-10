const { NotFound } = require("http-errors");
const { User } = require("../../models");

const emailConfirmationController = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFound("User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verified: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = emailConfirmationController;
