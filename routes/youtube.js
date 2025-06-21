const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { searchVideos, getChannelInfo } = require('../controllers/youtubeController');

router.get('/search', searchVideos);
router.get('/channel', getChannelInfo);

module.exports = router;
