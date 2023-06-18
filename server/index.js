const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const mongoose = require('mongoose');
const AuthRoutes = require('./routes/auth');
const MessageRoutes = require('./routes/messages');
const RequestRoutes = require('./routes/request');
const socket = require("socket.io");
const File = require("./model/fileSchema");

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


app.use("/api/auth", AuthRoutes); 
app.use("/api/messages", MessageRoutes);
app.use("/api/request", RequestRoutes);

app.use(express.json());
app.use(fileUpload());

app.post("/api/addppt", async (req, res) => {

  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  
  const student = req.body.student;
  const file = req.files.file;
  const filename = student + ".pptx";
  const uploadPath = __dirname + "/public/uploads/" + filename;
  console.log(req.body.student," hii");
  console.log(req.files.file);
  console.log(filename);
  
  //create a new file in the database for the fileSchema 

  

  const ppt = await File.findOne({ student: student });
  console.log(ppt);
  if (ppt) {
    return res.json({msg: "File already exists."});
  }

  const newFile = await File.create({
    name: filename,
    student,
  });

  if (!newFile) {
    return res.status(500).json({ error: "Failed to upload the file." });
  }

  file.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to upload the file." });
    }

    return res.json({ msg: "File uploaded successfully." });
  });
});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});


const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
});


global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
