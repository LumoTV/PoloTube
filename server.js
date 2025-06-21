const express = require('express');
const mongoose = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const youtubeRoutes = require('./routes/youtube');
const playlistRoutes = require('./routes/playlist');
const recommendationsRoutes = require('./routes/recommendations');

dotenv.config();

const app = express();
app.use(express.json());

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/recommendations', recommendationsRoutes);

// Servir fichiers statiques dans /public
app.use(express.static(path.join(__dirname, 'public')));

// Pages frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/video', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'video.html'));
});

app.get('/channel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'channel.html'));
});

app.get('/playlist', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'playlist.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
