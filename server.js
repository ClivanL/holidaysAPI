
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const mongoose = require("mongoose");
const debug = require("debug")
const path = require("path");

const holidaysController = require("./controllers/HolidaysController");

const app = express();
const PORT = process.env.PORT ?? 2000;
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/holidays" 
const log = debug("simon:server");


mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
app.use(express.static("./frontend/dist"));
app.use("/api/holidays", holidaysController);

app.get("/api/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/login/", (req, res) => {
  const { username, password} = req.body;
  if (username === "admin" && password === "123") {
    req.session.user = "admin"; //? create the session & store the cookie
    console.log("Login session", req.session.user)
    res.send({ status: "success", data: { name: "admin", id: "aaa"}} );
  } else {
    res.send({ status: "error"})
  }
});



app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
});

app.listen(PORT, () => {
  log(`Server is running on port ${PORT}`);
});
