import { io } from "socket.io-client";

const URL = "https://ws.asclepius.xyz";
const socket = io(URL, { autoConnect: true });

export default socket;