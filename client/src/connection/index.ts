import io from "socket.io-client";
import Terrain from "../terrain";

export default class Connection {
  socket: any;
  terrain: Terrain;

  constructor(terrain: Terrain) {
    this.terrain = terrain;
  }

  init() {
    const socket = io('http://localhost:5000');
    socket.auth = { sessionID: localStorage.getItem('currentAccount') };
    socket.connect();

    socket.on("customBlocks", (allBlocks) => {
        this.terrain.customBlocks = allBlocks
        this.terrain.initBlocks()
        this.terrain.generate()
    })
    
    socket.on("addBlock", (user, newBlock) => {
      this.terrain.customBlocks.push(newBlock);
      // this.terrain.blocks[newBlock.holdingBlock].instanceMatrix.needsUpdate = true;
      // this.terrain.buildBlock(, newBlock.type);
      console.log("SOCKET ADD BLOCK", user, newBlock);
      this.terrain.initBlocks()
      this.terrain.generate()
    });

    socket.on("session", (...args) => {
      console.log(args);
    });
    window.totalUsers = 1;
    socket.on("totalUsers", (n: Number) => {
      window.totalUsers = (n + 1).toString();
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
