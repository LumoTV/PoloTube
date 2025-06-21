const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createPlaylist, getPlaylists, addVideo } = require('../controllers/playlistController');

router.post('/', auth, createPlaylist);
router.get('/', auth, getPlaylists);
router.post('/:id/videos', auth, addVideo);

module.exports = router;
