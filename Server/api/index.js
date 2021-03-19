const express = require("express")
const router = express.Router()


router.get("/", (req, res, next) => {
    try {
      res.send({response: "Alive!"}).status(200)
    } catch (error) {
        next(error)
    }
})

// server.listen(port, () => console.log(`listening on port ${port}`))

module.exports = router

// router.use((req, res, next) => {
//     const error = new Error('Route not found')
//     error.status = 404
//     next(error)
// })