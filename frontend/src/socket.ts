import { io } from "socket.io-client";

export const socket = io("https://ai-chat-model-project-1.onrender.com/api/v1", {
  withCredentials: true,
});
