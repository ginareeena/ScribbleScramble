// const path = require('path')
const express = require("express");
const app = express();
// const morgan = require('morgan')
const http = require("http");

const index = require("./api/index");

const port = process.env.PORT || 4001;

// app.use(morgan('dev'))
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.use(index);

const server = http.createServer(app);
const serverSocket = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

let interval;

serverSocket.on("connection", (socket) => {
  console.log(`server new client connected on ${socket.id}`);
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

serverSocket.on("disconnect", (socket) => {
  console.log(`Connection ${socket.id} has left the building`);
  clearInterval(interval);
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit("FromAPI", response);
};

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
