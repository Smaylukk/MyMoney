const router = require('express').Router()
const documentController = require('../controllers/documentController')
const authMiddleware = require('../middlewares/authMiddleware')

router.use(authMiddleware);

router.post('/', documentController.create)
router.get('/', documentController.getAll)
router.put('/:id', documentController.change)
router.delete('/:id', documentController.delete)
router.get('/:id', documentController.getOne)

module.exports = router;