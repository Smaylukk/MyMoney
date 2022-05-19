const router = require('express').Router()
const userController = require('../controllers/userController')
const authMiddleware = require("../middlewares/authMiddleware")

router.post('/reg', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/password', authMiddleware, userController.changePassword)
router.post('/username', authMiddleware, userController.changeUsername)

module.exports = router;