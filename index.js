const express = require('express');

const { 
  createNewUser, userLogin, listAllUsers, getUserById,
  
  // deleteUser, // req 12
} = require('./controllers/userController');

const {
  createCategory, listAllCategories,
} = require('./controllers/categoriesController');

const {
  createBlogPosts, listBlogPosts, listBlogPostById, updateBlogPost, deletePostById,
} = require('./controllers/blogPostController'); // req 7, 8, 9, 10,11

const auth = require('./middlewares/auth');
const { error } = require('./middlewares/errorMiddlewares');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Users 
app.post('/user', createNewUser); // Req 1 Cria o usuário
app.post('/login', userLogin); // Req 2 login de usuário
app.get('/user', auth, listAllUsers); // Req 3 lista todos os usuários
app.get('/user/:id', auth, getUserById); // Req 4 lita o usuário pelo Id

// app.delete('/user/me', auth, deleteUser); // Req 12

// Categories e  BlogPosts
app.post('/categories', auth, createCategory); // Req 5 cria a categoria
app.get('/categories', auth, listAllCategories); // Req 6
app.post('/post', auth, createBlogPosts); // Req 7
app.get('/post', auth, listBlogPosts); // Req 8
app.get('/post/:id', auth, listBlogPostById); // Req 9
app.put('/post/:id', auth, updateBlogPost); // Req 10
app.delete('/post/:id', auth, deletePostById); // Req 11

app.use(error);
app.listen(3000, () => console.log('ouvindo porta 3000!'));