const express = require('express');
const axios = require('axios');
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Route pour récupérer les vidéos tendances (Top videos)
router.get('/', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet,statistics',
        chart: 'mostPopular',
        maxResults: 10,
        regionCode: 'FR' // ou 'US' ou autre selon ta cible
      }
    });

    // Formatage simple des données
    const videos = data.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      views: item.statistics.viewCount,
      thumbnail: item.snippet.thumbnails.medium.url
    }));

    res.json(videos);

  } catch (error) {
    console.error('Erreur API YouTube:', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des vidéos' });
  }
});

module.exports = router;
