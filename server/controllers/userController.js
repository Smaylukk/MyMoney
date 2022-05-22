const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const ApiError = require("../error/ApiError")
const {User} = require('../models/models')
const jwtService = require("../services/jwtService")

class UserController {

  async registration(req, res, next){
    try {
      const {email, username, password, role} = req.body
  
      const candidate = await User.findOne({where: {email}});
      if (candidate) {
        return next(ApiError.badRequestError(`Користувач з email ${email} вже створений`));
      }
  
      const passHash = bcrypt.hashSync(password, 5)
      const user = await User.create({email, username, password: passHash});
  
      const payload = {
        id: user.id,
        email,
        username
      }
      const token = jwtService.generateToken(payload);
  
      return res.json(token);
    } catch (error) {
      return next(ApiError.badRequestError(error.message))
    }
  }

  async login(req, res, next){
    try {
      const { email, password } = req.body

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.badRequestError(`Користувача не знайдено`));
      }

      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        return next(ApiError.badRequestError(`Пароль користувача неправильний`));
      }

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      }
      const token = jwtService.generateToken(payload);  

      return res.json(token);
    } catch (error) {
      return next(ApiError.badRequestError(error.message))
    }
  }

  async check(req, res, next) {
    try {
      const payload = {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username
      }
      const token = jwtService.generateToken(payload);

      return res.json(token);
    } catch (error) {
      next(ApiError.internalError('Непердбачувана помилка - ' + error));
    }
  }

  async changePassword(req, res, next) {
    try {
      const { password, newPassword } = req.body
      const userId = req.user.id
      const user = await User.findByPk(userId);
      if (!user) {
        return next(ApiError.badRequestError(`Користувача не знайдено`));
      }

      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        return next(ApiError.badRequestError(`Пароль користувача неправильний`));
      }

      const newPassHash = bcrypt.hashSync(newPassword, 5);
      user.password = newPassHash;
      await user.save();

      return res.json({message: 'Пароль успішно змінено'});
    } catch (error) {
      return next(ApiError.badRequestError(error.message))
    }
  }

  async changeUsername(req, res, next) {
    try {
      const { username } = req.body
      const userId = req.user.id
      const user = await User.findByPk(userId);
      if (!user) {
        return next(ApiError.badRequestError(`Користувача не знайдено`));
      }

      user.username = username;
      await user.save();

      return res.json({ message: 'Пароль успішно змінено' });
    } catch (error) {
      return next(ApiError.badRequestError(error.message))
    }
  }
}

module.exports = new UserController()