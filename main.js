const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Video = require("./video.model");
const multer = require("multer");
const app = express();

app.use(express.json());
app.use("/static", express.static("static"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose
  .connect("mongodb://localhost:27017/video")
  .then(() => {
    console.log("connected...");
  })
  .catch((err) => {
    console.log("faild DB connect ...");
  });

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "static");
  },
  filename: (req, file, callback) => {
    callback(null, `video_${file.originalname}`);
  },
});
const uploadVideo = multer({ storage });

app.get("/", (req, res) => {
  res.send("running...");
});
app.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.status(200).json({ videos });
  } catch (error) {
    return res.status(400).json(error);
  }
});
app.post("/video", uploadVideo.single("video"), async (req, res) => {
  const { titleText, titleColor, aspectRatio } = req.body;
  console.log(titleText);
  try {
    const video = new Video({
      title: {
        text: titleText,
        color: titleColor,
      },
      aspectRatio,
      url: "static/" + req.file.filename,
    });
    await video.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.listen("8085");
