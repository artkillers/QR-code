const audio = document.getElementById('audio');
const playBtn = document.getElementById('btnPlayPause');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const themeSelect = document.getElementById('themeSelect');
const textColor = document.getElementById('textColor');
const fontSelect = document.getElementById('fontSelect');

// Play / Pause Logic
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  iconPlay.style.display = 'none';
  iconPause.style.display = 'block';
});
audio.addEventListener('pause', () => {
  iconPlay.style.display = 'block';
  iconPause.style.display = 'none';
});

// Update progress
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// Seek
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
});

// Format time
function formatTime(s) {
  const min = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

// Toggle settings panel
settingsToggle.addEventListener('click', () => {
  settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
});

// Theme switch
themeSelect.addEventListener('change', () => {
  document.body.classList.toggle('light', themeSelect.value === 'light');
});

// Font switch
fontSelect.addEventListener('change', () => {
  document.body.style.fontFamily = fontSelect.value;
});

