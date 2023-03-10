const { BadRequest } = require("http-errors");
const { sendMail } = require("../../helpers");
const { User } = require("../../models");
const { v4: uuidv4 } = require("uuid");

const { PORT } = process.env;

const resendEmailConfirmationController = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("User not found");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const verificationToken = uuidv4();
  await User.updateOne({ email }, { verificationToken });

  const mail = {
    to: email,
    subject: "Please confirm your email",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}" >Confirm email please</a>`,
  };
  await sendMail(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendEmailConfirmationController;
