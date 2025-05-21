// Elements
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

// Play/pause toggle
btnPlayPause.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

// Update play/pause icon
audio.addEventListener('play', () => {
  iconPlay.style.display = 'none';
  iconPause.style.display = 'block';
});
audio.addEventListener('pause', () => {
  iconPlay.style.display = 'block';
  iconPause.style.display = 'none';
});

// Update progress bar & time
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressPercent + '%';

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

// Seek audio on progress bar click
progressContainer.addEventListener('click', e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  if(duration) {
    audio.currentTime = (clickX / width) * duration;
  }
});

// Format seconds to mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
}

const playlist = [
  { title: "Track 1", src: "audio.mp3" },
  { title: "Track 2", src: "musik.mp3" },
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

window.addEventListener("DOMContentLoaded", () => {
  loadTrack(currentTrack);
});

// ========================================== \\

// Toggle settings panel visibility
settingsToggle.addEventListener('click', () => {
  if (settingsPanel.style.display === 'block') {
    settingsPanel.style.display = 'none';
    settingsPanel.setAttribute('aria-hidden', 'true');
  } else {
    settingsPanel.style.display = 'block';
    settingsPanel.setAttribute('aria-hidden', 'false');
  }
});

// Apply saved or default theme and font on load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const savedFont = localStorage.getItem('font') || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

  themeSelect.value = savedTheme;
  fontSelect.value = savedFont;

  applyTheme(savedTheme);
  applyFont(savedFont);
});

// Theme selection handler
themeSelect.addEventListener('change', e => {
  const theme = e.target.value;
  applyTheme(theme);
  localStorage.setItem('theme', theme);
});

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
  }
}

// Font selection handler
fontSelect.addEventListener('change', e => {
  const font = e.target.value;
  applyFont(font);
  localStorage.setItem('font', font);
});

function applyFont(font) {
  document.body.style.fontFamily = font;
}

// Close settings panel if clicking outside
document.addEventListener('click', function(event) {
  if (
    !settingsPanel.contains(event.target) &&
    !settingsToggle.contains(event.target)
  ) {
    settingsPanel.style.display = 'none';
    settingsPanel.setAttribute('aria-hidden', 'true');
  }
});