const ApiError = require("../error/ApiError");
const jwtService = require("../services/jwtService");

module.exports = function (req, res, next){
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const authorization = req.headers.authorization;
    if (!authorization || authorization.indexOf('Bearer') === -1) {
      return next(ApiError.unautorizeError('Користувач не авторизований - відсутній токен'))
    }
  
    const token = authorization.split(' ')[1]
    if (!token) {
      return next(ApiError.unautorizeError('Користувач не авторизований - токен пустий'))
    }

    req.user = jwtService.verifyToken(token);
    next();
  } catch (error) {
    return next(ApiError.unautorizeError(`Помилка авторизації - ${error.message}`))
  }

}