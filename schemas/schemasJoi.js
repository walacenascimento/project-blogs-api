const Joi = require('joi');

/* Referência: https://joi.dev/api/?v=17.6.0  */

// Requisito 01, validações do requisito 1
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

// Requisito 02, validações do requisito 2
const loginSchema = Joi.object({
  email: Joi.string().email().empty().required()
    .messages({
    'string.empty': '"email" is not allowed to be empty',
    'any.required': '"email" is required',

  }),
  password: Joi.string().min(6).empty().required()
  .messages({ 
    'string.min': '"password" length must be 6 characters long',
    'any.required': '"password" is required',
    'string.empty': '"password" is not allowed to be empty',
  }),
  image: Joi.string(),
});

// Requisito 5
const categorieSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '"name" is required',
  }),
});

// Requisito 7
const blogPostSchemas = (title, content, categoryIds) => {
  const postSchema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': '"title" is required',
      'any.required': '"title" is required',
    }),
    content: Joi.string().empty().required().messages({
      'string.empty': '"content" is required',
      'any.required': '"content" is required',
    }),
    categoryIds: Joi.array().empty().required().messages({
      'any.required': '"categoryIds" is required',
    }),
  });

  return postSchema.validate({ title, content, categoryIds });
};

// Req 10
const updateblogPostSchemas = Joi.object({
  title: Joi.string().required().messages({
    'any.required': '"title" is required',
  }),
    content: Joi.string().required().messages({
    'any.required': '"content" is required',
  }),
});

module.exports = {
  userSchema, loginSchema, categorieSchema, blogPostSchemas, updateblogPostSchemas,
};
