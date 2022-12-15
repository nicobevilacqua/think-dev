import Gun from "gun";

const gun = Gun(["http://localhost:8080/gun"]);

export function emit(key: any, value: any) {
  gun.get(key).set(value);
}
