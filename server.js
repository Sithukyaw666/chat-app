const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join("index.html"));
});
io.on("connection", (socket) => {
  socket.broadcast.emit("connected", "a user connected");
  socket.on("disconnect", () => {
    socket.broadcast.emit("disconnected", "a user out");
  });
  socket.on("message", (message) => {
    io.emit("message", message);
  });
});
server.listen(PORT, () => console.log("server is up"));
