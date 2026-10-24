
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend files
app.use(express.static("public"));

// Listen for WebSocket-style connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Receive message from frontend
  socket.on("chat-message", (message) => {
    console.log("Received:", message);

    // Send message to ALL connected clients
    io.emit("chat-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
