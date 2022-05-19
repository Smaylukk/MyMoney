const ApiError = require('../error/ApiError');
const seq = require('sequelize');
const { Wallet, Document, Currency, AccumsMoney } = require('../models/models')

class WalletService {

  async getAllWallets(userId) {
    const wallets = await Wallet.findAll({
      where: [
        {userId}
      ],
      include: [
        {
          model: Currency,
          attributes: [
            'name',
            'key'
          ]
        },
        {
          model: Document,
          attributes: [
            'id',
            'date',
            'source',
            'comment',
            'summ',
          ]
        }
      ]
    });

    return wallets;
    
  }

  async getOneWallet(id, userId) {
    const wallet = await Wallet.findOne( {
      where: [
        {id},
        {userId}
      ],
      include: [
        {
          model: Currency,
          attributes: [
            'name',
            'key'
          ]
        },
        {
          model: Document,
          attributes: [
            'id',
            'date',
            'source',
            'comment',
            'summ',
          ]
        }
      ]
    });

    return wallet;
  }

  async getBalanceWallets(userId) {
    const wallets = await Wallet.sequelize.query(`
    SELECT 
      "wallet"."id", 
      "wallet"."name", 
      "wallet"."userId", 
      sum("accumsMoneys"."summ") AS "sum", 
      "currency"."key" AS "currency" 
      FROM "wallets" AS "wallet" 
      LEFT OUTER JOIN "currencies" AS "currency" 
        ON "wallet"."currencyId" = "currency"."id" 
      LEFT OUTER JOIN "accumsMoneys" AS "accumsMoneys" 
      ON "wallet"."id" = "accumsMoneys"."walletId" 
    WHERE "wallet"."userId" = ${userId}
    GROUP BY 
      "wallet"."id", 
      "wallet"."name", 
      "currency"`,
      {
        replacements: {userId},
        type: seq.QueryTypes.SELECT
      });

    return wallets;
  }

  async getBalanceCurrency(userId) {
    const wallets = await Wallet.sequelize.query(`
    SELECT 
      "currency"."id" AS "ID",
      "currency"."key" AS "currency",
      sum("accumsMoneys"."summ") AS "sum"      
    FROM "wallets" AS "wallet" 
      LEFT OUTER JOIN "currencies" AS "currency" 
        ON "wallet"."currencyId" = "currency"."id" 
      LEFT OUTER JOIN "accumsMoneys" AS "accumsMoneys" 
      ON "wallet"."id" = "accumsMoneys"."walletId" 
  WHERE "wallet"."userId" = ${userId}
    GROUP BY
      "ID",
      "currency"`,
      {
        type: seq.QueryTypes.SELECT
      });

    return wallets;
  }

  async createWallet(name, currencyId, userId) {
    const wallet = await Wallet.create({ name, currencyId, userId });
    
    return wallet;
  }

  async changeWallet(id, name, currencyId, userId) {
    const wallet = await Wallet.findOne({
      where: [
        {id},
        {userId}
      ]
    });

    if (wallet) {
      await wallet.update({ name, currencyId })
    }

    return wallet;
  }

  async deleteWallet(id, userId) {
    const wallet = await Wallet.findOne({
      where: [
        { id },
        { userId }
      ]
    });

    if (wallet) {
      //очистка зв'язаних таблиць 
      await AccumsMoney.destroy({
        where: {
          walletId: id
        }
      });

      await Document.destroy({
        where: {
          walletId: id
        }
      });
      //видалення об'єкта
      await wallet.destroy()
    }

    return wallet;
  }

}

module.exports = new WalletService()