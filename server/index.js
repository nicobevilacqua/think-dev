const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,
 { cors: {
    origin: "http://localhost:3000",
    // or with an array of origins
    // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    credentials: true
  }
});

 
app.use(express.static('../client/dist'))

/*
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
*/
/*
io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      console.log("hay session");
      return next();
    }
  }
  return next(new Error("invalid wallet"));
});
*/

let users = [];

io.on("connection", (socket) => {
  console.log("a user connected", {
    sessionID: socket.sessionID,
    s:socket.handshake.auth.sessionID
  });

  if (!users.includes(socket.handshake.auth.sessionID)) {
    users.push(socket.handshake.auth.sessionID);
    io.emit('totalUsers', users.length);
  }

  socket.emit("session", {
    sessionID: socket.handshake.auth.sessionID,
  });

  socket.on("addBlock", (...args) => {
    console.log("addBlock", args);
    socket.broadcast.emit("addBlock", socket.handshake.auth.sessionID, ...args);
  });

  socket.on("pong", () => {
    users.push(socket.handshake.auth.sessionID);
  });
});

setInterval(() => {
  users = [];
  io.emit('ping');
  setTimeout(() => {
    io.emit('totalUsers', users.length);
  });
}, 30000);

server.listen(5000, () => {
  console.log("listening on *:5000");
});
