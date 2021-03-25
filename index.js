const path = require("path");
const morgan = require("morgan");

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = process.env.PORT || 4001;

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "/FrontEnd/build")));

//api routes
app.get("/", (req, res, next) => {
  try {
    res.send({ response: "Alive!" }).status(200);
  } catch (error) {
    next(error);
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/FrontEnd/build", "index.html"));
});

//sockets
const serverSocket = require("socket.io")(http,
   {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
}
);

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
