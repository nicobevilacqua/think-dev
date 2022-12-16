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

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.wallet = session.wallet;
      return next();
    }
  }
  const wallet = socket.handshake.auth.walletID;
  if (!wallet) {
    return next(new Error("invalid wallet"));
  }
  // create new session
  socket.sessionID = randomId();
  socket.wallet = wallet;
  next();
});

io.on("connection", (socket) => {
  console.log("a user connected", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
