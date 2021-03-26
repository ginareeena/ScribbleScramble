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

// error handling
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
//testing only!
const listPlayers = (players) => {
  console.log(cyan(JSON.stringify(players)));
};

serverSocket.on("connection", (socket) => {
  console.log(yellow(`(server) new client connected: ${socket.id}`));

  let userAdded = false;
  socket.on("add new player", (username) => {
    console.log(magenta("on: add new player"));
    //if player has already registered, return
    // if (userAdded) {
    //   console.log(magenta("this player has already been added"));
    //   return;
    // } else {
    socket.username = username;
    players[socket.id] = socket.username;
    userAdded = true;
    console.log(blueBright(`player ${socket.username} has been added`));
    console.log(cyan(JSON.stringify(players)));
  });

  socket.on("add text box", (value) => {
    console.log(magenta("on: add text box"));
    console.log(blueBright("server/add text box value", value));
    socket.broadcast.emit("create new text box", value);
  });

  socket.on("disconnect", () => {
    console.log(blueBright(red(`(id: ${socket.id}) has left the building.`)));
  });
});

http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
