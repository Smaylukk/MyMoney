const ApiError = require("../error/ApiError");
const seq = require("sequelize");
const { User } = require("../models/models");

class UserService {
  async createUser(email, username, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw new Error(`Користувач з email ${email} вже створений`);
    }

    const passHash = bcrypt.hashSync(password, 5);
    const user = await User.create({ email, username, password: passHash });

    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error(`Користувача не знайдено`);
    }

    return user;
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(`Користувача не знайдено`);
    }

    return user;
  }

  async changeUserPassword(userId, newPassword) {
    const user = await this.getUserById(userId);

    user.password = newPassword;
    await user.save();
  }

  async changeUsername(userId, username) {
    const user = await this.getUserById(userId);

    user.username = username;
    await user.save();
  }
}

module.exports = new UserService();
