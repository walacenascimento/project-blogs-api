const express = require('express');
const { userController } = require('./controllers/userController');
const auth = require('./middlewares/auth');
const { error } = require('./middlewares/errorMiddlewares');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Req 1 Cria o usuário
app.post('/user', auth, userController);

app.use(error);
app.listen(3000, () => console.log('ouvindo porta 3000!'));