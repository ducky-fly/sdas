const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add the title"],
  },
  artist: {
    type: String,
    required: [true, "please add the artist"],
  },
  lyrics: {
    type: String,
    required: [true, "please add the Lyrics"],
  },
  url_audio: {
    type: String,
    required: [true, "please add the url_audio"],
  },
  url_img: {
    type: String,
    required: [true, "please add the url_audio"],
  },
  releaseDate: {
    type: String,
    required: [true, "please add the ReleaseDate"],
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  views: { type: Number, default: 0 },
});

module.exports = mongoose.model("Song", schema);
