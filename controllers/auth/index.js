const signupUserController = require("./signupUserController");
const loginUserController = require("./loginUserController");
const logoutUserController = require("./logoutUserController");
const getCurrentUserController = require("./getCurrentUserController");
const updateUserSubscriptionController = require("./updateUserSubscriptionController");
const updateUserAvatarController = require("./updateUserAvatarController");
const emailConfirmationController = require("./emailConfirmationController");

module.exports = {
  signupUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  updateUserSubscriptionController,
  updateUserAvatarController,
  emailConfirmationController
};
