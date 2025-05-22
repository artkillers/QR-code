// ==================== ELEMENT SELECTORS ====================

const audio = document.getElementById('audio');
const btnPlayPause = document.getElementById('btnPlayPause');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const progressContainer = document.getElementById('progressContainer');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const themeSelect = document.getElementById('themeSelect');
const fontSelect = document.getElementById('fontSelect');
const floatToggle = document.getElementById('floatToggle');
const player = document.querySelector('.player-container');

// ==================== AUDIO PLAYER LOGIC ====================

// Play/pause toggle
btnPlayPause.addEventListener('click', () => {
  audio.paused ? audio.play() : audio.pause();
});

// Toggle play/pause icon
audio.addEventListener('play', () => {
  iconPlay.style.display = 'none';
  iconPause.style.display = 'block';
});
audio.addEventListener('pause', () => {
  iconPlay.style.display = 'block';
  iconPause.style.display = 'none';
});

// Progress bar update
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

// Click-to-seek
progressContainer.addEventListener('click', e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  if (audio.duration) {
    audio.currentTime = (clickX / width) * audio.duration;
  }
});

// Format time mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
}

// ==================== PLAYLIST CONTROL ====================

const playlist = [
  { title: "Sound Track", src: "audio.mp3" },
  { title: "Sound Track", src: "musik.mp3" },
];

let currentTrack = 0;

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  document.getElementById("songTitle").textContent = track.title;
  audio.load();
}

document.getElementById("btnNext").addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
});

document.getElementById("btnPrev").addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
});

// ========== UI SETTINGS ( MODE | THEME | FONT) ===========

themeSelect.addEventListener('change', e => {
  const theme = e.target.value;
  applyTheme(theme);
  localStorage.setItem('theme', theme);
});

fontSelect.addEventListener('change', e => {
  const font = e.target.value;
  applyFont(font);
  localStorage.setItem('font', font);
});

function applyTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
}

function applyFont(font) {
  document.body.style.fontFamily = font;
}

document.getElementById('view-mode').addEventListener('change', function() {
document.body.classList.remove('view-mobile', 'view-tablet', 'view-desktop');
document.body.classList.add(`view-${this.value}`);
});

// ==================== TOGGLE BEHAVIOR ====================

document.addEventListener("DOMContentLoaded", () => {
  // Load default track
  loadTrack(currentTrack);

  // Apply saved settings
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const savedFont = localStorage.getItem('font') || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  themeSelect.value = savedTheme;
  fontSelect.value = savedFont;
  applyTheme(savedTheme);
  applyFont(savedFont);

  // Sembunyikan player & settings saat awal
  player.style.display = "none";
  settingsPanel.style.display = "none";

  // Toggle player
  floatToggle.addEventListener("click", e => {
    e.stopPropagation();
    player.style.display = player.style.display === "flex" ? "none" : "flex";
  });

  // Toggle settings
  settingsToggle.addEventListener("click", e => {
    e.stopPropagation();
    settingsPanel.style.display = settingsPanel.style.display === "block" ? "none" : "block";
  });

  // Klik di luar untuk tutup semua
  document.addEventListener("click", e => {
    if (!player.contains(e.target) && !floatToggle.contains(e.target)) {
      player.style.display = "none";
    }
    if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
      settingsPanel.style.display = "none";
    }
  });
});

