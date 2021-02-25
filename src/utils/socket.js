import { io } from "socket.io-client";

const URL = "http://localhost:3001";
const socket = io(URL, { autoConnect: true });

export default socket;

// onMessage(content) {
//   if (this.selectedUser) {
//     socket.emit("private message", {
//       content,
//       to: this.selectedUser.userID,
//     });
//     this.selectedUser.messages.push({
//       content,
//       fromSelf: true,
//     });
//   }
// }

// socket.on("private message", ({ content, from }) => {
//   for (let i = 0; i < this.users.length; i++) {
//     const user = this.users[i];
//     if (user.userID === from) {
//       user.messages.push({
//         content,
//         fromSelf: false,
//       });
//       if (user !== this.selectedUser) {
//         user.hasNewMessages = true;
//       }
//       break;
//     }
//   }
// });