// const { blogPostsCategories } = require('../services/postBlogServices');
const { created, badRequest } = require('../utils/statusCode');
// const { BlogPosts, Categories, Users} = require('../models');
const { BlogPosts, Categories } = require('../models');
const { blogPostSchemas } = require('../schemas/schemasJoi');

const verifyCategory = async (category) => {
  const categories = await Categories.findAll({ where: { id: category } });

  return categories.length === category.length;
};

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
module.exports = {
  blogPosts,
};