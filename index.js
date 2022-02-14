const express = require('express');
const { 
  createNewUser, userLogin, listAllUsers, getUserById, 
} = require('./controllers/userController');

const {
  createCategory, listAllCategories,
} = require('./controllers/categoriesController');

const auth = require('./middlewares/auth');
const { error } = require('./middlewares/errorMiddlewares');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', createNewUser); // Req 1 Cria o usuário
app.post('/login', userLogin); // Req 2 login de usuário
app.get('/user', auth, listAllUsers); // Req 3 lista todos os usuários
app.get('/user/:id', auth, getUserById); // Req 4 lita o usuário pelo Id

// Categories
app.post('/categories', auth, createCategory); // Req 5 cria a categoria
app.get('/categories', auth, listAllCategories); // Req 6

app.use(error);
app.listen(3000, () => console.log('ouvindo porta 3000!'));