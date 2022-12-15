import * as gun from "./gun";
import * as socket from "./socket";

export function onBlockAdded(block: any) {
  const event = "BLOCK_ADDED";
  gun.emit(event, block);
  socket.emit(event, block);
}

export function onBlockRemoved(block: any) {
  const event = "BLOCK_REMOVED";
  gun.emit(event, block);
  socket.emit(event, block);
}
