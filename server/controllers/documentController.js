const ApiError = require('../error/ApiError');
const documentService = require('../services/documentService');

class DocumentController {

  async getAll(req, res, next) {
    try {
      const userId = req.user.id;
      const documents = await documentService.getAllDocuments(userId)

      return res.status(200).json(documents);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const document = await documentService.getOneDocument(id, userId)

      return res.status(200).json(document);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async create(req, res, next) {
    try {
      const { date, type, source, comment, summ, walletId } = req.body;
      const userId = req.user.id;

      if (!date) {
        return next(ApiError.badRequestError('Невірний формат дати'))
      }
      const dateDoc = new Date(date)
            
      if (type !== 'in' && type !== 'out') {
        return next(ApiError.badRequestError('Поле type документу повинен бути лише "in" чи "out"'))
      }

      const document = await documentService.createDocument(dateDoc, type, source, comment, summ, walletId, userId)
        
      return res.status(200).json(document);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async change(req, res, next) {
    try {
      const { id } = req.params;
      const { date, type, source, comment, summ, walletId } = req.body;
      const userId = req.user.id;

      if (!date) {
        return next(ApiError.badRequestError('Невірний формат дати'))
      }
      const dateDoc = new Date(date)

      if (type !== 'in' && type !== 'out') {
        return next(ApiError.badRequestError('Поле type документу повинен бути лише "in" чи "out"'))
      }

      const document = await documentService.changeDocument(id, dateDoc, type, source, comment, summ, walletId, userId)
      
      return res.status(200).json(document);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }

  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const document = await documentService.deleteDocument(id, userId);

      return res.status(200).json(document);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

module.exports = new DocumentController()