let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
  let date = new Date(ms);
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let seconds = String(date.getUTCSeconds()).padStart(2, '0');
  let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
  }
}

function pause() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = '00:00:00';
  lapsContainer.innerHTML = '';
}

function lap() {
  if (isRunning) {
    let lapTime = formatTime(elapsedTime);
    let li = document.createElement('li');
    li.textContent = `Lap: ${lapTime}`;
    lapsContainer.appendChild(li);
  }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
