import io from "socket.io";

const socket = io();

export function emit(event: any, properties: any) {
  socket.emit(event, properties);
}
