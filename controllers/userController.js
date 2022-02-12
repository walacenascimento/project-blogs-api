const { createUser } = require('../services/userServices');
const { created } = require('../utils/statusCode');

const userCreate = async (req, res, next) => {
 try {
   const { displayName, email, password, image } = req.body;
   const tokenUser = await createUser(displayName, email, password, image);
   return res.status(created).json({ token: tokenUser });
 } catch (err) {
   next(err);
 }
};

module.exports = { userCreate };