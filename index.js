const { yellow, red, blueBright, magenta, cyan, green } = require("chalk");
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");
const moniker = require("moniker");
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
let rooms = [];
const nameIt = () => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
  });
};
// const listPlayers = () => {
//   console.log(cyan("current players:", JSON.stringify(players)));
// };
// const listRooms = () => {
//   console.log(green("rooms"));
//   rooms.forEach((room) => {
//     console.log(green(JSON.stringify(room)));
//   });
// };

//socket events
serverSocket.on("connection", (socket) => {
  console.log(yellow(`server new client connected on ${socket.id}`));

  socket.on("disconnect", () => {
    delete players[socket.username];
    socket.disconnect();
    console.log(
      red(
        `player ${socket.username} has left the building (clientID: ${socket.id})`
      )
    );
    listPlayers();
  });

  socket.on("scribble time", ({ username, room, action }) => {
    //save username on socket
    if (username === "random") username = moniker.choose();
    socket.username = username;

    //create new player + store in player object
    let newPlayer = new Player(socket);
    players[socket.username] = newPlayer;

    //if join button:
    if (action === "join") {
      if (rooms.includes(room)) {
        socket.join(room);
        newPlayer.setRoom(room);
        socket.emit("scramble time", room);
      } else {
        socket.emit("invalid room");
      }

      //if create button:
    } else {
      room = nameIt();
      socket.room = room;
      rooms.push(room);
      socket.join(room);
      newPlayer.setRoom(room);
      socket.emit("scramble time", room);
    }
  });

  // re: canvas
  socket.on("add text box", ({ room, canvasJSON }) => {
    socket.in(room).emit("create new text box", canvasJSON);
  });

  socket.on("send new lines", (value) => {
    socket.in(value.room).emit("load new lines", value.canvasJSON);
  });
});

http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
