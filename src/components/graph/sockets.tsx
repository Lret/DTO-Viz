import { Socket } from "rete"

// Any socket
export const anySocket = new Socket("any");

// Object socket
export const objSocket = new Socket("obj");
objSocket.combineWith(anySocket);

// String socket
export const strSocket = new Socket("str");
strSocket.combineWith(anySocket);

// Number socket
export const numSocket = new Socket("num");
numSocket.combineWith(anySocket);
numSocket.combineWith(strSocket);
