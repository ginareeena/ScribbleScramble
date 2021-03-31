const path = require("path");
const morgan = require("morgan");

const express = require("express");
const app = express()
const http = require("http")
// const baseServer = http.createServer()

const cors = require("cors")

const { Server } = require("socket.io")
const cluster = require("cluster")
const redisAdapter = require("socket.io-redis")
// const redis = require("redis")
const numCPUs = require("os").cpus().length;
const { setupMaster, setupWorker } = require("@socket.io/sticky")
// const sticky = require("socketio-sticky-session")
const port = process.env.PORT || 4001;

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "FrontEnd/build")));
app.use(cors())

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  const httpServer = http.createServer()
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });
  httpServer.listen(port)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} started`)

    const httpServer = http.createServer()
    const io = new Server(httpServer)
    io.adapter(redisAdapter({ host: "localhost", port: 6379}))
    setupWorker(io);

    io.on("connection", (socket) => {
      console.log(`server new client connected on ${socket.id}`);
      socket.on("add text box", (value, textCanvas) => {
        console.log("server side heard add text box!");
        socket.broadcast.emit("create new text box", value, textCanvas);
      });
      socket.on("send new lines", (value) => {
        console.log("server side heard drawing from front end!");
        console.log("drawing value received in back: --->", value);
        socket.broadcast.emit("load new lines", value);
      });
    });

  })
}

//api routes
app.get("/", (req, res, next) => {
  try {
    res.send({ response: "Alive!" }).status(200);
  } catch (error) {
    next(error);
  }
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "FrontEnd/build", "index.html"));
});

//error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Internal server error");
});

//sockets
// const serverSocket = require("socket.io")(http, {
//   cors: {
//     origin: ["http://localhost:3000", "http://localhost:4001"],
//     methods: ["GET", "POST"],
//     credentials: true
//   },
// });


// serverSocket.on("connection", (socket) => {
//   console.log(`server new client connected on ${socket.id}`);
//   socket.on("drawing", (value) => {
//     console.log("server side heard drawing!");
//     console.log("drawing value received in back: --->", value);
//     socket.broadcast.emit("adding to drwing", value);
//   });
// });
