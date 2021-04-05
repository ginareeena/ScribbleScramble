const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");
const moniker = require("moniker");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);

const port = process.env.PORT || 4001;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "FrontEnd/build")));
app.use(cors());

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
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Internal server error");
});

const serverSocket = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:4001"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let players = {};
let rooms = [];
const nameIt = () => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "-",
  });
};

serverSocket.on("connection", (socket) => {
  console.log(`server new client connected on ${socket.id}`);

  socket.on("disconnect", () => {
    delete players[socket.id];
    socket.disconnect();
  });

  socket.on("scribble time", ({ username, room }) => {
    if (username === "random") username = moniker.choose();
    socket.username = username;
    if (room && !rooms.includes(room)) {
      socket.emit("invalid room");
    } else {
      if (!room) {
        room = nameIt();
        rooms.push(room);
      }
      socket.room = room;
      socket.join(room);
      players[socket.username] = socket.room;
      socket.emit("scramble time", room);
    }
  });

  socket.on("get room players", (room) => {
    let playersInRoom = [];
    for (let username in players) {
      if (players[username] === room) {
        playersInRoom.push(username);
      }
    }
    socket.in(room).emit("all players", playersInRoom);
  });

  socket.on("add text box", ({ room, canvasJSON }) => {
    socket.in(room).emit("create new text box", canvasJSON);
  });

  socket.on("send new lines", (value) => {
    socket.in(value.room).emit("load new lines", value.canvasJSON);
  });

  const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
  const { room } = socket.handshake.query;
  if (socket.in(room)) {
    socket.join(room);
  }
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    serverSocket.in(room).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });
});

http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
