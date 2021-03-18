const router = require('express').Router()
module.exports = router

router.use('/string', require('./string'))


router.use((req, res, next) => {
    const error = new Error('Route not found')
    error.status = 404
    next(error)
})