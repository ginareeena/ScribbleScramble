const router = require('express').Router()
module.exports = router

router.use('/string', require('./string'))

router.get("/", (req, res, next) => {
    try {
      res.send({response: "Alive!"}).status(200)
    } catch (error) {
        next(error)
    }
})


router.use((req, res, next) => {
    const error = new Error('Route not found')
    error.status = 404
    next(error)
})