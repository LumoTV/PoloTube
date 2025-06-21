const Playlist = require('../models/Playlist');

exports.createPlaylist = async (req, res) => {
  const { name } = req.body;
  try {
    const playlist = await Playlist.create({ userId: req.user.id, name, videos: [] });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create playlist' });
  }
};

exports.getPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ userId: req.user.id });
  res.json(playlists);
};

exports.addVideo = async (req, res) => {
  const { videoId } = req.body;
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    if (!playlist.videos.includes(videoId)) {
      playlist.videos.push(videoId);
      await playlist.save();
    }
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add video' });
  }
};
