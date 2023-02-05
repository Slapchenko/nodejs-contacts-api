const express = require("express");
const { validationMiddleware, authMiddleware } = require("../../middlewares");
const { errorHandler } = require("../../helpers");
const { contactSchema, contactStatusSchema } = require("../../schemas");
const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  removeContactByIdController,
  updateStatusContactController,
} = require("../../controllers");

const router = express.Router();

router.get("/", authMiddleware, errorHandler(getContactsListController));

router.get("/:id", errorHandler(getContactByIdController));

router.post(
  "/",
  authMiddleware,
  validationMiddleware(contactSchema),
  errorHandler(createContactController)
);

router.delete("/:id", errorHandler(removeContactByIdController));

router.put(
  "/:id",
  validationMiddleware(contactSchema),
  errorHandler(updateContactByIdController)
);

router.patch(
  "/:id/favorite",
  validationMiddleware(contactStatusSchema),
  errorHandler(updateStatusContactController)
);

module.exports = router;
