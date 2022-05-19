const ApiError = require('../error/ApiError');
const {Currency} = require('../models/models')


class CurrencyController {

  async getAll(req, res, next){
    try {
      const currencies = await Currency.findAll();
  
      return res.status(200).json(currencies);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const currency = await Currency.findOne({ where: { id } });

      return res.status(200).json(currency); 
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async create(req, res, next) {
    try {
      const { code, name, key } = req.body;
      const candidate = await Currency.findOne({ where: { code } });
      if (candidate) {
        return res.status(200).json(candidate);
      }

      const currency = await Currency.create({ code, name, key });
      return res.status(200).json(currency);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async change(req, res, next) {
    try {
      const {id} = req.params;
      const { code, name, key} = req.body;
      const candidate = await Currency.findOne({ where: { id } });
      if (candidate) {
        await candidate.update({code, name, key})
        
        return res.status(200).json(candidate);
      }

      return next(ApiError.badRequestError('Валюту не знайдено'))
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
    
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const candidate = await Currency.findOne({ where: { id } });
      if (candidate) {
        await candidate.destroy()
      }

      return res.status(200).json(candidate);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
  
}

module.exports = new CurrencyController()