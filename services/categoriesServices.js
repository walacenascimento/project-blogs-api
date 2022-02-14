const { Categories } = require('../models');
const { categorieSchema } = require('../schemas/schemasJoi');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest } = require('../utils/statusCode');

// Req 5
const categoryCreate = async (name) => {
  // VALIDAÇÕES DO SCHEMA CATEGORIES
  const { error } = categorieSchema.validate({ name });

  if (error) {
    throw errorConstructor(badRequest, { message: error.message });
  }

  const categorie = await Categories.create({ name });
  return categorie;
};

// Req 6
const categoriesAllList = async () => {
  const listCategories = await Categories.findAll();
  return listCategories;
};

module.exports = {
  categoryCreate, categoriesAllList,
};