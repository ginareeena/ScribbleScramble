const { yellow, red, blueBright, magenta, cyan, green } = require("chalk");
const Player = require("./player");

const path = require("path");
const morgan = require("morgan");
const express = require("express");

const app = express();
const http = require("http").createServer(app);
const cors = require("cors");

const { isObject } = require("util");

const port = process.env.PORT || 4001;

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "FrontEnd/build")));
app.use(cors());

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
    credentials: true,
  },
  // transports: ["websocket"]
  //^^TECHNICALLY NEEDED - currently throwing errors. don't delete. yet.
});

let players = {};
let playerCount = 0;
let gameRooms = [];
const listPlayers = () => {
  console.log(cyan("current players:", JSON.stringify(players)));
  console.log(green("player count:", playerCount));
};

//socket events
serverSocket.on("connection", (socket) => {
  console.log(yellow(`server new client connected on ${socket.id}`));

  //re: players
  socket.on("add new player", (username) => {
    console.log(magenta("on: add new player"));
    socket.username = username;
    let newPlayer = new Player(socket.id, username);
    players[username] = newPlayer;
    ++playerCount;
    console.log(blueBright("new player added: ", JSON.stringify(newPlayer)));
    listPlayers();
  });

  socket.on("disconnect", (socket) => {
    console.log(magenta("on: disconnect"));
    delete players[socket.username];
    console.log(
      red(
        `player ${socket.username} has left the building (clientID: ${socket.id})`
      )
    );
    listPlayers()
  });

  serverSocket.of("/").adapter.on("create-room", (room) => {
    console.log(magenta("on: create-room"));
    console.log(blueBright(`room ${room} was created`));
  });

  socket.on("join-room", ({ room, id }) => {
    console.log(magenta("on: join-room"));
    socket.join(room);
    console.log(blueBright(`socket ${id} has joined room ${room}`));
  });

  socket.on("add text box", (value, textCanvas) => {
    console.log("server side heard add text box!");
    socket.broadcast.emit("create new text box", value, textCanvas);
  });
  socket.on("send new lines", (value) => {
    console.log("server side heard drawing from front end!");
    socket.broadcast.emit("load new lines", value);
  });
});

http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
