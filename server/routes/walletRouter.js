const router = require('express').Router()
const walletController = require('../controllers/walletController')
const authMiddleware = require('../middlewares/authMiddleware')

router.use(authMiddleware);

router.post('/', walletController.create)
router.get('/', walletController.getAll)
router.get('/balance', walletController.getBalance)
router.get('/balanceCurrency', walletController.getBalanceCurrency)
router.put('/:id', walletController.change)
router.delete('/:id', walletController.delete)
router.get('/:id', walletController.getOne)

module.exports = router;