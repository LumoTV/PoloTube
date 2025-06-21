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

exports.getChannelInfo = async (req, res) => {
  const { id, name } = req.query;

  try {
    let response;
    if (id) {
      response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          part: 'snippet,statistics,contentDetails',
          id
        }
      });
    } else if (name) {
      // Recherche par nom de chaîne (optionnel, plus complexe)
      response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          part: 'snippet',
          q: name,
          type: 'channel',
          maxResults: 1
        }
      });
      if (response.data.items.length === 0) {
        return res.status(404).json({ error: 'Chaîne introuvable' });
      }
      const channelId = response.data.items[0].snippet.channelId;
      // Récupérer les détails complets avec l’ID
      response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          part: 'snippet,statistics,contentDetails',
          id: channelId
        }
      });
    } else {
      return res.status(400).json({ error: 'ID ou nom de chaîne requis' });
    }

    if (response.data.items.length === 0) {
      return res.status(404).json({ error: 'Chaîne introuvable' });
    }

    const channel = response.data.items[0];
    // Récupérer quelques vidéos de la chaîne
    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
    const videosResponse = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: 'snippet',
        playlistId: uploadsPlaylistId,
        maxResults: 10
      }
    });

    const channelData = {
      title: channel.snippet.title,
      description: channel.snippet.description,
      thumbnail: channel.snippet.thumbnails.medium.url,
      subscriberCount: channel.statistics.subscriberCount,
      videos: videosResponse.data.items.map(item => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt
      }))
    };

    res.json(channelData);

  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données de la chaîne' });
  }
};
