const { categoryCreate } = require('../services/categoriesServices');
const { created } = require('../utils/statusCode');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await categoryCreate(name);
    return res.status(created).json(category);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
};