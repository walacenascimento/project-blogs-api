const {
  createUser, loginUser, usersAllList, userGetById, servicesDeleteUser,
} = require('../services/userServices');
const { created, sucess, noContent } = require('../utils/statusCode');

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

// Req 4
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await userGetById(id);
    return res.status(sucess).json(userById);
  } catch (err) {
    next(err);
  }
};

// Req 12 
const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.user;

    await servicesDeleteUser(email);
    return res.status(noContent).json({});
  } catch (error) {
    next(error);
}
};

module.exports = {
  createNewUser, userLogin, listAllUsers, getUserById, deleteUser,
};