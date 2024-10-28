let startTime, updatedTime, difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 0);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const timeString = new Date(difference).toISOString().substr(11, 8);
    display.textContent = timeString;
}

function pauseTimer() {
    clearInterval(timerInterval);
    running = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    display.textContent = "00:00:00";
    laps = [];
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = new Date(difference).toISOString().substr(11, 8);
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
