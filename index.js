const { yellow, red, blueBright, magenta, cyan } = require("chalk");
//yellow: new client connected
// red: client disconnected
// magenta: event from front end
// blueBright: server 'message'
// cyan: current players
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

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

const makeID = uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals],
  length: 3,
});

//socket middleware -> add username to socket object
serverSocket.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;

  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = makeID();
  socket.userID = makeID();
  socket.username = username;
  next();
});

serverSocket.on("connection", (socket) => {
  console.log(
    magenta("on: connection"),
    yellow(`(server) new client connected: ${socket.id}`)
  );

  //get all existing players + add new player
  const players = [];
  for (let [id, socket] of serverSocket.of("/").sockets) {
    players.push({
      userId: id,
      username: socket.username,
    });
  }
  socket.emit("new player added", players);
  const player = {
    userId: socket.id,
    username: socket.username,
  };
  //notify existing players of new player
  socket.broadcast.emit("new player connected", player);
  console.log(blueBright("players: ", JSON.stringify(players)));

  // socket.on("create new game", (data) => {
  //   console.log(magenta("on: create new game"));
  //   socket.join(`room ${++roomId}`);
  //   const game = { name: data.name, room: `room ${roomId}` };
  //   socket.emit("newGame", game);
  //   console.log(blueBright(`new game ready in room ${game.room}`));
  // });

  socket.on("disconnect", () => {
    // delete players[socket.id];
    console.log(red(`(${socket.username}) has left the building.`));
    // listPlayers();
  });

  //drawing
  socket.on("add text box", (value, textCanvas) => {
    console.log("server side heard add text box!");
    // console.log("server/add text box value", value);
    socket.broadcast.emit("create new text box", value, textCanvas);
  });
  socket.on("send new lines", (value) => {
    console.log("server side heard drawing from front end!");
    console.log("drawing value received in back: --->", value);
    socket.broadcast.emit("load new lines", value);
  });
});

http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
