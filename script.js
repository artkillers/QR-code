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
  { title: "Strangers", src: "strangers.mp3" },
  { title: "Mistake", src: "mistake.mp3" },
  { title: "Sucks", src: "sucks.mp3" },
  { title: "Without", src: "without.mp3" }
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

// ========== UI SETTINGS ( THEME AND FONT ) ===========

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

  // Tambahkan class awal
  player.classList.add("hidden");

  // Toggle player floating
  floatToggle.addEventListener("click", e => {
    e.stopPropagation();
    player.classList.toggle("floating");
    player.classList.toggle("hidden");
  });

  // Toggle settings panel
  settingsPanel.style.display = "none";
  settingsToggle.addEventListener("click", e => {
    e.stopPropagation();
    const isVisible = settingsPanel.style.display === "block";
    settingsPanel.style.display = isVisible ? "none" : "block";
  });

  // Klik di luar untuk tutup
  document.addEventListener("click", e => {
    if (!player.contains(e.target) && !floatToggle.contains(e.target)) {
      player.classList.add("hidden");
      player.classList.remove("floating");
    }
    if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
      settingsPanel.style.display = "none";
    }
  });
});