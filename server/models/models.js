const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true, allowNull:false},
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  isactivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USER' },
})

const Currency = sequelize.define('currency', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  key: { type: DataTypes.STRING, allowNull: false },
})

const Wallet = sequelize.define('wallet', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
})

const Document = sequelize.define('document', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE, allowNull: false },
  type: { type: DataTypes.ENUM, values: ['in', 'out'] },
  source: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  comment: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  summ: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
})

const AccumsMoney = sequelize.define('accumsMoney', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE, allowNull: false },
  summ: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
})

//wallet
User.hasMany(Wallet);
Wallet.belongsTo(User);

Currency.hasMany(Wallet);
Wallet.belongsTo(Currency);

//document
Wallet.hasMany(Document);
Document.belongsTo(Wallet);

User.hasMany(Document);
Document.belongsTo(User);

//accumsMoney
Wallet.hasMany(AccumsMoney);
AccumsMoney.belongsTo(Wallet);

Document.hasMany(AccumsMoney);
AccumsMoney.belongsTo(Document);

module.exports = {
  User, Currency, Wallet, Document, AccumsMoney
}