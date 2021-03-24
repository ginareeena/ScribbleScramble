// const path = require('path')
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = process.env.PORT || 4001;

// const morgan = require('morgan')

const index = require("./api/index");
app.use(index);

// app.use(morgan('dev'))
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

const serverSocket = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

serverSocket.on("connection", (socket) => {
  console.log(`server new client connected on ${socket.id}`);
  socket.on("add text box", (value) => {
    console.log("server side heard add text box!");
    console.log("server/add text box value", value);
    socket.broadcast.emit("create new text box", value);
  });
});

http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
