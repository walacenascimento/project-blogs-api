const express = require('express');
const { createNewUser, userLogin, listAllUsers
   } = require('./controllers/userController');

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

app.use(error);
app.listen(3000, () => console.log('ouvindo porta 3000!'));