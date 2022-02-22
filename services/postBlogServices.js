const { BlogPosts, Categories, Users } = require('../models');
const { blogPostSchemas } = require('../schemas/schemasJoi');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest, notFound } = require('../utils/statusCode');

// Req 7
const verifyCategory = async (category) => {
  const categories = await Categories.findAll({ where: { id: category } });

  return categories.length === category.length;
};

// Req 7
const servicesBlogPosts = async (title, content, categoryIds, userId) => {
  // Faz a validação do schema (blogPostSchemas)
  const { error } = blogPostSchemas(title, content, categoryIds);
  if (error) throw errorConstructor(badRequest, { message: error.message });

  const verifyCategorie = await verifyCategory(categoryIds);
   if (verifyCategorie === false) {
     throw errorConstructor(badRequest, { message: '"categoryIds" not found' });
   }

  const createBlogPost = await BlogPosts.create({ title, content, userId });
    return createBlogPost;
};

// Req 8
const servicesPostCategories = async () => {
  const findAllPost = await BlogPosts.findAll({
    include: [
      { model: Categories, as: 'categories' },
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  return findAllPost;
};

// Req 9
const servicesPostFindId = async (id) => {
  const postFind = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: Categories, as: 'categories', through: { attributes: [] } },
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });

  if (!postFind) throw errorConstructor(notFound, { message: 'Post does not exist' });

  return postFind;
};

module.exports = {
  servicesBlogPosts, servicesPostCategories, servicesPostFindId,
}; 
