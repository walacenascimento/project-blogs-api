const { Categories } = require('../models');
const { categorieSchema } = require('../schemas/schemasJoi');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest } = require('../utils/statusCode');

const categoryCreate = async (name) => {
  // VALIDAÇÕES DO SCHEMA CATEGORIES
  const { error } = categorieSchema.validate({ name });

  if (error) {
    throw errorConstructor(badRequest, { message: error.message });
  }

  const categorie = await Categories.create({ name });
  return categorie;
};

module.exports = {
  categoryCreate,
};