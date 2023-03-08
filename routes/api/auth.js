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
} = require("../../schemas");

const {
  signupUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  updateUserSubscriptionController,
  updateUserAvatarController,
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
  validationMiddleware(userSubscriptionSchema),
  errorHandler(updateUserAvatarController)
);

module.exports = router;
