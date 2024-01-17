// Import required modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

// Set up middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start the server
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

// Set up socket.io
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// Maintain a global Map to store online users and their socket IDs
global.onlineUsers = new Map();

// Handle socket.io connections
io.on("connection", (socket) => {
  global.chatSocket = socket;

  // Event: "add-user"
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  // Event: "send-msg"
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      // Emit "msg-recieve" event to the targeted user's socket
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
