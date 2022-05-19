const ApiError = require('../error/ApiError');
const { Wallet, Document, AccumsMoney } = require('../models/models')

class DocumentService {

  async getAllDocuments(userId) {
    const documents = await Document.findAll({
      where: [
        {userId}
      ],
      order: [
        ['date']
      ],
      include: [
        { model: Wallet },
        { model: AccumsMoney }
      ]
    });

    return documents;
  }

  async getOneDocument(id, userId) {
    const document = await Document.findOne( {
      where: [
        {id},
        {userId}
      ],
      include: [
        { model: Wallet },
        { model: AccumsMoney }
      ]
    });

    return document;
  }

  async createDocument(date, type, source, comment, summ, walletId, userId) {
    const document = await Document.create({ date, type, source, comment, summ, walletId, userId });
    const accumRecord = await this.addRecordAccumsMoney(date, summ, type, document.id, walletId);

    return document;
    
  }

  async changeDocument(id, date, type, source, comment, summ, walletId, userId) {
    const document = await Document.findOne({
      where: [
        {id},
        {userId}
      ]
    });

    if (document) {
      await document.update({ date, type, source, comment, summ, walletId, userId })

      const accumRecord = await this.addRecordAccumsMoney(date, summ, type, id, walletId);
    }
    return document;
  }

  async deleteDocument(id, userId) {
    const document = await Document.findOne({
      where: [
        {id},
        {userId}
      ]
    });
    
    if (document) {
      await AccumsMoney.destroy({ 
        where: { 
          documentId:id 
        } 
      });
      await document.destroy()
    }

    return document;
  }

  async addRecordAccumsMoney(date, summ, type, documentId, walletId) {
    await AccumsMoney.destroy({ where: { documentId } });

    const summAccum = type === 'in' ? summ : -summ;
    const accumRecord = await AccumsMoney.create({ date, summ: summAccum, documentId, walletId });
    return accumRecord;
  }

}

module.exports = new DocumentService()