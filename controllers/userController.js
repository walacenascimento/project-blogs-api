const { createUser, loginUser, usersAllList } = require('../services/userServices');
const { created, sucess } = require('../utils/statusCode');

// Req 1 Cria o usuário
const createNewUser = async (req, res, next) => {
 try {
   const { displayName, email, password, image } = req.body;
   const tokenUser = await createUser(displayName, email, password, image);
   return res.status(created).json({ token: tokenUser });
 } catch (err) {
   next(err);
 }
};

// Req 2 Login de usuáro
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password); // criar no services
    return res.status(sucess).json({ token: user });
  } catch (err) {
    next(err);
  }
};

// Req 3
const listAllUsers = async (_req, res, next) => {
  try {
    const usersAll = await usersAllList();
    return res.status(sucess).json(usersAll);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewUser,
  userLogin,
  listAllUsers,
};