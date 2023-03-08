const validationMiddleware = require("./validationMiddleware");
const authMiddleware = require("./authMiddleware");
const uploadMiddleware = require("./uploadMiddleware");

module.exports = {
  validationMiddleware,
  authMiddleware,
  uploadMiddleware,
};
