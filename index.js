const { yellow, red, blueBright, magenta, cyan } = require("chalk");
const Player = require("./player");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors")
const port = process.env.PORT || 4001;

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "FrontEnd/build")));
app.use(cors())

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
const serverSocket = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:4001"],
    methods: ["GET", "POST"],
    credentials: true
  },
});

let players = [];
const listPlayers = () => {
  console.log(cyan("current players:"));
  players.forEach((player) => {
    console.log(cyan(JSON.stringify(player)));
  });
};

serverSocket.on("connection", (socket) => {
  console.log(magenta("on: connection"));
  console.log(yellow(`server new client connected on ${socket.id}`));

  socket.on("add new player", ({ username, role }) => {
    console.log(magenta("on: add new player"));
    let newPlayer = new Player(socket.id, username);
    // ENUM vs boolean?
    if (role === "draw") {
      newPlayer.setIsDraw();
    }
    if (role === "write") {
      newPlayer.setIsWrite();
    }
    players.push(newPlayer);
    console.log(blueBright("new player added: ", JSON.stringify(newPlayer)));
    socket.broadcast.emit("new player added", players);
    listPlayers();
  });

  //canvas
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

// serverSocket.on("connection", (socket) => {
//   console.log(`server new client connected on ${socket.id}`);
//   socket.on("drawing", (value) => {
//     console.log("server side heard drawing!");
//     console.log("drawing value received in back: --->", value);
//     socket.broadcast.emit("adding to drwing", value);
//   });
// });

http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
