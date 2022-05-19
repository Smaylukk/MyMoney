const seq = require('sequelize');
const ApiError = require("../error/ApiError")
const { Wallet, User, Currency, Document, AccumsMoney } = require('../models/models');
const walletService = require('../services/walletService');

class WalletController {

  async getAll(req, res, next) {
    try {
      const userId = req.user.id;
      const wallets = await walletService.getAllWallets(userId);

      return res.status(200).json(wallets);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const wallet = await walletService.getOneWallet(id, userId);

      return res.status(200).json(wallet);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async getBalance(req, res, next) {
    try {
      const userId = req.user.id;
      const wallets = await walletService.getBalanceWallets(userId);

      return res.status(200).json(wallets);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async getBalanceCurrency(req, res, next) {
    try {
      const userId = req.user.id;
      const wallets = await walletService.getBalanceCurrency(userId);

      return res.status(200).json(wallets);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async create(req, res, next) {
    try {
      const { name, currencyId } = req.body;
      const userId = req.user.id;

      const wallet = await walletService.createWallet(name, currencyId, userId);
      return res.status(200).json(wallet);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async change(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { name, currencyId } = req.body;
      const wallet = await walletService.changeWallet(id, name, currencyId, userId);
      
      if (wallet) {
        return res.status(200).json(wallet);
      }else{
        return next(ApiError.badRequestError('Гаманець не знайдено'))
      }
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }

  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const wallet = await walletService.deleteWallet(id, userId);
      if (wallet) {
        await wallet.destroy()
      }

      return res.status(200).json(wallet);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

}

module.exports = new WalletController()