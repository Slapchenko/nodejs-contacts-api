const express = require("express");

const {
  validationMiddleware,
  authMiddleware,
  uploadMiddleware,
} = require("../../middlewares");

const { errorHandler } = require("../../helpers");

const {
  userSignupSchema,
  userLoginSchema,
  userSubscriptionSchema,
  emailConfirmationResendSchema
} = require("../../schemas");

const {
  signupUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  updateUserSubscriptionController,
  updateUserAvatarController,
  emailConfirmationController,
  resendEmailConfirmationController
} = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validationMiddleware(userSignupSchema),
  errorHandler(signupUserController)
);

router.post(
  "/login",
  validationMiddleware(userLoginSchema),
  errorHandler(loginUserController)
);

router.get("/logout", authMiddleware, errorHandler(logoutUserController));

router.get("/current", authMiddleware, errorHandler(getCurrentUserController));

router.patch(
  "/",
  authMiddleware,
  validationMiddleware(userSubscriptionSchema),
  errorHandler(updateUserSubscriptionController)
);

router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  errorHandler(updateUserAvatarController)
);

router.get("/verify/:verificationToken", errorHandler(emailConfirmationController));

router.post(
  '/verify',
  validationMiddleware(emailConfirmationResendSchema),
  errorHandler(resendEmailConfirmationController)
);

module.exports = router;
