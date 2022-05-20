const models = require('../models/models');

class StartService{

  async initTable(){
    const hryvnja = await models.Currency.findOne({where:{code: '980'}})
    if (!hryvnja) {
      await models.Currency.create({ code: '980', name: 'Гривня', key:'₴'})
    }

    const dolarUSA = await models.Currency.findOne({ where: { code: '840' } })
    if (!dolarUSA) {
      await models.Currency.create({ code: '840', name: 'Долар США', key: '$' })
    }

    const euro = await models.Currency.findOne({ where: { code: '978' } })
    if (!euro) {
      await models.Currency.create({ code: '978', name: 'Гривня', key: '€' })
    }
  }
}

module.exports = new StartService()