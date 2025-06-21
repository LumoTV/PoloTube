async function fetchRecommendations() {
  try {
    const res = await fetch('/api/recommendations');
    const videos = await res.json();
    const container = document.getElementById('videos');
    container.innerHTML = '';

    videos.forEach(video => {
      const div = document.createElement('div');
      div.className = 'video-card';

      div.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.title}" />
        <div class="video-info">
          <h3>${video.title}</h3>
          <p>${video.channel}</p>
          <p>${Number(video.views).toLocaleString()} vues</p>
        </div>
      `;

      div.onclick = () => {
        window.location.href = `/video?id=${video.id}`;
      };

      container.appendChild(div);
    });
  } catch (err) {
    console.error('Erreur lors du chargement des vidéos', err);
  }
}

fetchRecommendations();
