const { BlogPosts, Categories, Users } = require('../models');
const { blogPostSchemas } = require('../schemas/schemasJoi');
const { created, sucess, badRequest, serverError } = require('../utils/statusCode');

// Req 7
const verifyCategory = async (category) => {
  const categories = await Categories.findAll({ where: { id: category } });

  return categories.length === category.length;
};

// Req 7
const blogPosts = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  try {
    const { error } = blogPostSchemas(title, content, categoryIds);
    if (error) return res.status(badRequest).json({ message: error.message });
    const verifyCategorie = await verifyCategory(categoryIds);

    if (verifyCategorie === false) {
      return res.status(badRequest).json({ message: '"categoryIds" not found' }); 
    }

  const createBlogPost = await BlogPosts.create({ title, content, userId });

    return res.status(created).json(createBlogPost);
  } catch (err) {
    return res.status(badRequest).json(err);
  }
};

// Req 8
const findAllPosts = async (_req, res) => {
  try {
    const postsFindAll = await BlogPosts.findAll({
      include: [
        { model: Categories, as: 'categories' },
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      ],
    });
    return res.status(sucess).json(postsFindAll);
  } catch (error) {
    return res.status(serverError).json({ message: error.message });
  }
};

module.exports = {
  blogPosts, findAllPosts,
};