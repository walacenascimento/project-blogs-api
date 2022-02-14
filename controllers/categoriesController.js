const { categoryCreate, categoriesAllList } = require('../services/categoriesServices');
const { created, sucess } = require('../utils/statusCode');

// Req 5
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await categoryCreate(name);
    return res.status(created).json(category);
  } catch (err) {
    next(err);
  }
};

// Req 6
const listAllCategories = async (_req, res, next) => {
  try {
    const allCategories = await categoriesAllList();
    return res.status(sucess).json(allCategories);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory, listAllCategories,
};