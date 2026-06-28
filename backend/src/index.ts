import app from "./app.js"
import { connectToDatabase } from "./db/connection.js";
import dotenv from "dotenv";
dotenv.config();
import http from 'http'
import {Server} from 'socket.io'


// Create HTTP server
const server =http.createServer(app);

// Export Socket.IO instance
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const POR=process.env.PORT|| 5000; 

connectToDatabase()
  .then(()=>{
  //@ts-ignore
    server.listen(POR,()=>
    console.log("server open & connected to database in port ❤️",POR));

})
.catch((err)=>console.log(err))

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
