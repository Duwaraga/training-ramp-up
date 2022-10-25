require("dotenv").config();
import "reflect-metadata";
import { AppDataSource } from "./utils/data-source";
import express from "express";
import * as BodyParser from "body-parser";
import cors from "cors";
import studentRoute from "./routes/student.route";
import { Server } from "socket.io";
import http from "http";
import userRoute from "./routes/user.route"

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(studentRoute);
app.use(userRoute);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

AppDataSource.initialize()
  .then(() => console.log("Server started !"))
  .catch((error) => console.log(error));

io.on("connection", (socket) => {
  console.log(`User Connect:${socket.id}`);

  socket.on("student_added", (data) => {
    socket.broadcast.emit("student_received", data);
  });
  socket.on("student_removed", (data) => {
    socket.broadcast.emit("student_deleted", data);
  });
});

server.listen(8080, () => console.log("App is running at port 8080."));
