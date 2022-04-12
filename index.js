const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
var cors = require("cors");

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

// path for static files
app.use("/images", express.static(path.join(__dirname, "/public/images")));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// handle uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// port listener
app.listen(8800, () => {
  console.log("Backend server is ready");
});
