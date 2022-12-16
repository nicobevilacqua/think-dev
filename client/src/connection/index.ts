import io from "socket.io-client";

export default class Connection {
  socket: any;

  constructor() {
    const socket = io('http://localhost:5000');
    socket.on("addBlock", (user, block,...args) => {
      console.log(user);
    });

    socket.on("removeBlock", (user, block, ...args) => {
      console.log(user);
    });
    this.socket = socket;

  }

  emit(event: any, properties: any) {
    this.socket.emit(event, properties);
  }

}
