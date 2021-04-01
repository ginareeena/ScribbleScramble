const { yellow, red, blueBright, magenta, cyan } = require("chalk");
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
});

let players = [];
const listPlayers = () => {
  console.log(cyan("current players:"));
  players.forEach((player) => {
    console.log(cyan(JSON.stringify(player)));
  });
};

serverSocket.on("connection", (socket) => {
  console.log(yellow(`server new client connected on ${socket.id}`));

  socket.on("add new player", (username) => {
    console.log(magenta("on: add new player"));
    let newPlayer = new Player(socket.id, username);
    players.push(newPlayer);
    console.log(blueBright("new player added: ", JSON.stringify(newPlayer)));
    socket.broadcast.emit("new player added", players);
    listPlayers();
  });

  // put emits in onClicks in front end buttons; if errors, use front end emit to give the room id
  let PRIVATE = "private";
  let PUBLIC = "public";

  socket.on("joinPublicRoom", () => {
    console.log(magenta("on: joinPublicRoom"));
    serverSocket.of("/").adapter.on("join-room", (PUBLIC, id) => {
      socket.join(PUBLIC);
      console.log(blueBright(`socket ${id} has joined room ${room}`));
    });
  });

  serverSocket.of("/").adapter.on("create-room", (room) => {
    console.log(magenta("on: create-room"));
    console.log(blueBright(`room ${room} was created`));
  });

  socket.on("join-room", ({ room, id }) => {
    console.log(magenta("on: joinPrivateRoom"));
    socket.join(room);
    console.log(blueBright(`socket ${id} has joined room ${room}`));

    // serverSocket.of("/").adapter.on("join-room", (PRIVATE, id) => {

    // });
  });

  console.log(`server new client connected on ${socket.id}`);
  socket.on("add text box", (value, textCanvas) => {
    console.log("server side heard add text box!");
    socket.broadcast.emit("create new text box", value, textCanvas);
  });
  socket.on("send new lines", (value) => {
    console.log("server side heard drawing from front end!");
    socket.broadcast.emit("load new lines", value);
  });
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

//this variable will increment inside socket

//namespace -> 'nsp' plan had been scribb..../room##; make own room name/hardcoded ?
//using socket.io's built in adapter instead of the redis-based adapter

// When creating new room, make sure new room is rendering new instance of the canvas

//base case: 2 rooms. 1 private, 1 public
//after that, expand private room ability to be more exclusive

//work in progress - room functionality
// let roomNo = 1;
// //  const {roomId} = socket.handshake.query
//  if(serverSocket.nsps['/'].adapter.rooms[roomNo] && serverSocket.nsps['/'].adapter.rooms[roomNo].length > 1)
//     {roomNo++
//     socket.join(roomNo)
//     }

//  //look for new messages
//  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
//    serverSocket.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data)
//  })

//   socket.on("send new lines", (value) => {
//     console.log("server side heard drawing from front end!");
//     console.log("drawing value received in back: --->", value);
//     socket.broadcast.emit("load new lines", value);
//   });
// })

http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
