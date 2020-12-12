const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    text: String,
    color: String,
  },
  url: String,
  aspectRatio: String,
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
