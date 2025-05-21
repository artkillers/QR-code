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

// Update icons
audio.addEventListener('play', () => {
  iconPlay.style.display = 'none';
  iconPause.style.display = 'block';
});
audio.addEventListener('pause', () => {
  iconPlay.style.display = 'block';
  iconPause.style.display = 'none';
});

// Time and progress
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60) || 0;
  const sec = Math.floor(seconds % 60) || 0;
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

// Toggle settings
settingsToggle.addEventListener('click', () => {
  settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
});

// Theme
themeSelect.addEventListener('change', () => {
  document.body.classList.toggle('light', themeSelect.value === 'light');
});

// Font
fontSelect.addEventListener('change', () => {
  document.body.style.fontFamily = fontSelect.value;
});

// Init
window.addEventListener('DOMContentLoaded', () => {
  if (themeSelect.value === 'light') {
    document.body.classList.add('light');
  }
  document.body.style.fontFamily = fontSelect.value;
});