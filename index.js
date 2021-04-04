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
const listPlayers = () => {
  console.log(cyan("current players:", JSON.stringify(players)));
};
const listRooms = () => {
  console.log(green("rooms"));
  rooms.forEach((room) => {
    console.log(green(JSON.stringify(room)));
  });
};
const listRoomPlayers = (room) => {
  for (let each in players) {
    console.log(red("players in room:"));
    console.log(red(JSON.stringify(each)));
  }
};

//socket events
serverSocket.on("connection", (socket) => {
  console.log(yellow(`server new client connected on ${socket.id}`));

  //re: players
  // socket.on("add new player", (username) => {
  //   console.log(blueBright("new player added: ", JSON.stringify(newPlayer)));
  //   listPlayers();
  // });

  socket.on("disconnect", () => {
    console.log(magenta("on: disconnect"));
    delete players[socket.username];
    console.log(
      red(
        `player ${socket.username} has left the building (clientID: ${socket.id})`
      )
    );
    listPlayers();
  });

  socket.on("scribble time", ({ username, room, action }) => {
    console.log(magenta("on: scribble time"));
    console.log(
      magenta(`username: ${username}, room: ${room}, action: ${action}`)
    );
    console.log(magenta(rooms));

    //save username on socket
    if (username === "random") username = moniker.choose();
    socket.username = username;

    //create new player + store in player object
    let newPlayer = new Player(socket);
    players[socket.username] = newPlayer;

    if (action === "join") {
      if (rooms.includes(room)) {
        socket.join(room);
        socket.emit("scramble time", room);
        console.log(blueBright("emitted scramble time"));
        console.log(blueBright(`${socket.username} added to ${socket.room}`));
        listPlayers();
        listRooms();
        listRoomPlayers();
      } else {
        socket.emit("invalid room");
        console.log(blueBright("emitted invalid room name"));
      }
    } else {
      if (!room) room = nameIt();
      socket.room = room;
      rooms.push(room);
      socket.join(room);
      console.log(blueBright(`${socket.username} added to ${socket.room}`));
      listPlayers();
      listRooms();
      listRoomPlayers();
      socket.emit("scramble time", room);
      console.log(blueBright("emitted scramble time"));
    }
  });

  // socket.on("", (username) => {
  //   console.log(magenta("on: create new room"));
  //   const room = nameIt();
  //   rooms.push(room);
  //   ++activeRooms;
  //   socket.emit("new room created", room);
  //   console.log(blueBright(`${username} has created room: ${room}`));
  // });

  // socket.on("join room", ({ username, room }) => {
  //   console.log(magenta("on: join room"));
  //   socket.join(room);
  //   // players[username].setRoom(room);
  //   console.log(blueBright(`${username} has joined room: ${room}`));
  //   listRooms();
  //   listRoomPlayers(room);
  // });

  // re: canvas
  socket.on("add text box", ({ room, canvasJSON }) => {
    console.log("server side heard add text box!");
    socket.in(room).emit("create new text box", canvasJSON);
  });

  socket.on("send new lines", (value) => {
    console.log("server side heard drawing from front end!", value);
    socket.in(value.room).emit("load new lines", value.canvasJSON);
  });
});

http.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
