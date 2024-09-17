require("dotenv").config();
const { env } = require("process");

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const roomId = uuidV4();
  res.redirect(`/${roomId}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  console.log("c:", socket.id);
  
  socket.on("join-room", (roomId, userId) => {
    console.log('roomId: ', roomId);
    console.log('userId: ', userId);
    
    socket.join(roomId);
    
    setTimeout(()=> {
      console.log("emitting: user-connected --> userId: ", userId);
      socket.to(roomId).emit("user-connected", userId);
    }, 200)

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=> {
  console.log(`Running on http:localhost:${PORT}`);
});
