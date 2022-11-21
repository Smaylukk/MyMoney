const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const jwtService = require("../services/jwtService");
const userService = require("../services/userService");

class UserController {
  async registration(req, res, next) {
    try {
      const { email, username, password } = req.body;

      const user = await userService.createUser(email, username, password);

      const payload = {
        id: user.id,
        email,
        username,
      };
      const token = jwtService.generateToken(payload);

      return res.json(token);
    } catch (error) {
      return next(ApiError.badRequestError(error.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await userService.getUserByEmail(email);

      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        return next(
          ApiError.badRequestError(`Пароль користувача неправильний`)
        );
      }

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      const token = jwtService.generateToken(payload);

      return res.json(token);
    } catch (error) {
      return next(ApiError.badRequestError(error.message));
    }
  }

  async check(req, res, next) {
    try {
      const payload = {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
      };
      const token = jwtService.generateToken(payload);

      return res.json(token);
    } catch (error) {
      next(ApiError.internalError("Непердбачувана помилка - " + error));
    }
  }

  async changePassword(req, res, next) {
    try {
      const { password, newPassword } = req.body;
      const userId = req.user.id;
      const user = await userService.getUserById(userId);

      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        return next(
          ApiError.badRequestError(`Пароль користувача неправильний`)
        );
      }

      const newPassHash = bcrypt.hashSync(newPassword, 5);
      await userService.changeUserPassword(userId, newPassHash);

      return res.json({ message: "Пароль успішно змінено" });
    } catch (error) {
      return next(ApiError.badRequestError(error.message));
    }
  }

  async changeUsername(req, res, next) {
    try {
      const { username } = req.body;
      const userId = req.user.id;

      await userService.changeUsername(userId, username);

      return res.json({ message: "Пароль успішно змінено" });
    } catch (error) {
      return next(ApiError.badRequestError(error.message));
    }
  }
}

module.exports = new UserController();
