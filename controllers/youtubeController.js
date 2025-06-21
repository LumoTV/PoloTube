const axios = require('axios');

exports.searchVideos = async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: 'snippet',
        q,
        maxResults: 10,
        type: 'video'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};
