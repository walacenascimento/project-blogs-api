const Joi = require('joi');

/* Referência: https://joi.dev/api/?v=17.6.0  */

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({ 
    'string.min': '"displayName" length must be at least 8 characters long', 
  }),
  email: Joi.string().email().required().messages({ 
    'string.email': '"email" must be a valid email',
    'any.required': '"email" is required',
  }),
  password: Joi.string().min(6).required().messages({ 
    'string.min': '"password" length must be 6 characters long',
    'any.required': '"password" is required',
  }),
  image: Joi.string(),
});

module.exports = { userSchema };
