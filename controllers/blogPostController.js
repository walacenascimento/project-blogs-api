const { servicesBlogPosts, servicesPostCategories, servicesPostFindId,
} = require('../services/postBlogServices');
const { created, sucess } = require('../utils/statusCode');

// Req 7 
const createBlogPosts = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;

    const newBlogPost = await servicesBlogPosts(title, content, categoryIds, userId);
    return res.status(created).json(newBlogPost);
  } catch (err) {
      next(err);
  }
}; 

// Req 8 
const listBlogPosts = async (_req, res, next) => {
  try {
    const findAllPosts = await servicesPostCategories();
    return res.status(sucess).json(findAllPosts);
  } catch (error) {
    next(error);
  }
};

// Req 9
const listBlogPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogPostFindId = await servicesPostFindId(id);
    return res.status(sucess).json(blogPostFindId);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlogPosts, listBlogPosts, listBlogPostById,
};