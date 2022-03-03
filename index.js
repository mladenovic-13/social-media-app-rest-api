const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// define express app
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true }, (err) => {
  if (err) console.log(err);
  else console.log("MongoDB connected");
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome to homepage!");
});
app.get("/user", (req, res) => {
  res.send("Welcome to user page!");
});

// routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// port listener
app.listen(8800, () => {
  console.log("Backend server is ready");
});
