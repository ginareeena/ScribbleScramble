const { yellow, red, blueBright, magenta, cyan } = require("chalk");
//yellow: new client connected
// red: client disconnected
// magenta: event from front end
// blueBright: server 'message'
// cyan: current players
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
app.use(express.static(path.join(__dirname, "FrontEnd/build")));

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
    origins: ["http://localhost:3000", "http://localhost:4001"],
    methods: ["GET", "POST"],
  },
});

let players = {};
let roomId = 0;
const listPlayers = () => {
  console.log(cyan(JSON.stringify(players)));
};

serverSocket.on("connection", (socket) => {
  console.log(
    magenta("on: connection"),
    yellow(`(server) new client connected: ${socket.id}`)
  );

  socket.on("add new player", (username) => {
    console.log(magenta("on: add new player"));
    socket.username = username;
    players[socket.id] = socket.username;
    console.log(blueBright(`player ${socket.username} has been added`));
    listPlayers();
  });

  socket.on("create new game", (data) => {
    console.log(magenta("on: create new game"));
    socket.join(`room ${++roomId}`);
    const game = { name: data.name, room: `room ${roomId}` };
    socket.emit("newGame", game);
    console.log(blueBright(`new game ready in room ${game.room}`));
  });

  // socket.on("player chose to draw", (username) => {
  //   console.log(magenta("on: player chose to draw"));
  //   players[username] = { ...players[username], status: "draw" };
  //   // console.log(blueBright(`${username} chose ${username.status}`));
  //   console.log(blueBright("chose draw"));
  // });

  // socket.on("player chose to write", (username) => {
  //   console.log(magenta("on: player chose to write"));
  //   players[username] = { ...players[username], status: "write" };
  //   // console.log(blueBright(`${username} chose ${players[username][status]}`));
  //   console.log(blueBright("chose write"));
  // });

  socket.on("disconnect", () => {
    delete players[socket.id];
    console.log(red(`(${socket.username}) has left the building.`));
    listPlayers();
    serverSocket.emit("player");
  });

  //drawing
  socket.on("add text box", (value) => {
    console.log(magenta("on: add text box"));
    console.log(blueBright("server/add text box value", value));
    socket.broadcast.emit("create new text box", value);
  });
});

http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
