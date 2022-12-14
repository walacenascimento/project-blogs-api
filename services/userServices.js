const { Users } = require('../models'); // 
const { userSchema, loginSchema } = require('../schemas/schemasJoi');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest, conflict, notFound } = require('../utils/statusCode');
const { genereteToken } = require('./authServices');

// Requisito 1
// Faz a validação do Schema
const createUser = async (displayName, email, password, image) => {
  const { error } = userSchema.validate({ displayName, email, password, image });

  if (error) {
    throw errorConstructor(badRequest, { message: error.message });
  }

  // Verifica se o email cadastrado já existe
  const EmailAlreadyExists = await Users.findOne({ where: { email } });
  if (EmailAlreadyExists) throw errorConstructor(conflict, { message: 'User already registered' });

  // Criar o usuário e retorna um token 
  const user = await Users.create({ displayName, email, password, image });
  const { password: _password, ...userWithoutPassword } = user;
  const token = genereteToken(userWithoutPassword);
  return token;
};

// Requisito 2
const loginUser = async (email, password) => {
  // Validação do Schema de login 
 const { error } = loginSchema.validate({ email, password });

 if (error) {
   throw errorConstructor(badRequest, { message: error.message });
 }

 // Verifica se existe o usuário cadastrado no banco de dados
 const findUser = await Users.findOne({ where: { email, password } });
 if (!findUser) throw errorConstructor(badRequest, { message: 'Invalid fields' });

 // Faz o ligin do usuário, retornando um token
 const { password: _password, ...userWithoutPassword } = findUser.dataValues;
 const token = genereteToken(userWithoutPassword);
 return token;
};

// Requisito 3
const usersAllList = async () => {
  const usersList = await Users.findAll();
  return usersList;
};

// Requisito 4
const userGetById = async (id) => {
  const userFindId = await Users.findOne({ where: { id } });

  if (!userFindId) {
    throw errorConstructor(notFound, { message: 'User does not exist' });
  }
  return userFindId;
};

// Req 12
const servicesDeleteUser = async (email) => {
  await Users.destroy({
    where: { email },
  });

  return null;
};

module.exports = {
  createUser,
  loginUser,
  usersAllList,
  userGetById,
  servicesDeleteUser,
};