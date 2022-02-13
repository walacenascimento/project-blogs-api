const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const API_SECRET = 'minhasenhamaisquesegura';
const jwtSecret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// Função que faz a geração do token
const genereteToken = (data) => jwt.sign({ data }, jwtSecret, jwtConfig);

// Função que faz a validação do token que foi gerado
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  genereteToken, verifyToken,
};
