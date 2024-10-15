import express from "express";
const app = express();
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { join } from "path";
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`users connected ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id ${socket.id} joined room ${data}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});
server.listen(3001, () => {
  console.log("server is running");
});
