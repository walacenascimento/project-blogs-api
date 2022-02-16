const authServices = require('../services/authServices');
const errorConstructor = require('../utils/errorConstructor');
const { unauthorized } = require('../utils/statusCode');
 
module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // if (!authorization) throw errorConstructor(unauthorized, { message: 'Token not found' });
    if (!authorization) {
      const error = errorConstructor(unauthorized, 'Token not found');
      return res.status(unauthorized).json(error);
    }

    const user = authServices.verifyToken(authorization);
    // if (!user) throw errorConstructor(unauthorized, { message: 'Expired or invalid token' });
    if (!user) {
      const error = errorConstructor(unauthorized, 'Expired or invalid token');
      return res.status(unauthorized).json(error);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};