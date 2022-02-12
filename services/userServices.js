const { Users } = require('../models'); // 
const { userSchema } = require('../schemas/userSchemas');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest, conflict } = require('../utils/statusCode');
const { genereteToken } = require('./authServices');

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

module.exports = { createUser };