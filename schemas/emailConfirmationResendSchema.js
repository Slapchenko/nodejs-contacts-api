const Joi = require('joi');

const emailConfirmationResendSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = emailConfirmationResendSchema;