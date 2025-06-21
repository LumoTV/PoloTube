const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { searchVideos } = require('../controllers/youtubeController');

router.get('/search', auth, searchVideos);

module.exports = router;
