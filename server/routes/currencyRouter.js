const router = require('express').Router()
const currencyController = require('../controllers/currencyController')
const authMiddleware = require('../middlewares/authMiddleware')

router.use(authMiddleware);

router.post('/', currencyController.create)
router.get('/', currencyController.getAll)
router.put('/:id', currencyController.change)
router.delete('/:id', currencyController.delete)
router.get('/:id', currencyController.getOne)

module.exports = router;