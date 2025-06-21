const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  videos: [String]  // Liste d'ID YouTube
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
