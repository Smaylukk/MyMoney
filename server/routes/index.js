const router = require('express').Router()
const currencyRouter = require('./currencyRouter');
const documentRouter = require('./documentRouter');
const userRouter = require('./userRouter');
const walletRouter = require('./walletRouter');


router.use('/user', userRouter)
router.use('/currency', currencyRouter)
router.use('/wallet', walletRouter)
router.use('/document', documentRouter)

module.exports = router;