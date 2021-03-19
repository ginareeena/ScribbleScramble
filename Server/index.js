const express = require('express')
const app = express()
const morgan = require('morgan')
// const httpServer = require('http').createServer(app)
const socketIo = require("socket.io")(httpServer)
const index = require('./api/index')

// const io = socketIo(httpServer)

// const PORT = 8080

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(index)

let interval

io.on("connection", (socket) => {
    console.log("New client connected")
    if(interval) {
        clearInterval(interval)
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000)
    socket.on("disconnect", () => {
        console.log("Client disconnected")
        clearInterval(interval)
    })
})

const getApiAndEmit = socket => {
    const response = new Date()
    socket.emit("FromAPI", response)
}



// httpServer.listen(PORT, () => {
//     console.log(`listening on port ${PORT}`)
// })