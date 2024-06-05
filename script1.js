// Get elements from the HTML document
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const milisecondsElement = document.querySelector('.miliseconds');
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
const lapsButton = document.querySelector('.laps');
const clearAllButton = document.querySelector('.clear-all');
const lapsContainer = document.querySelector('.laps-container');

// Variables to manage the state of the stopwatch
let isRunning = false; 
let startTime;
let lapNumber = 1; 
let pausedTime = 0; 

// Event listeners for buttons
startButton.addEventListener('click', toggleStart);
resetButton.addEventListener('click', resetStopwatch);
lapsButton.addEventListener('click', recordLap);
clearAllButton.addEventListener('click', clearAllLaps);

// Function to start or pause the stopwatch
function toggleStart() {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
}

// Function to start the stopwatch
function startStopwatch() {
    isRunning = true;
    if (pausedTime === 0) {
        startTime = Date.now();
    } else {
        startTime = Date.now() - pausedTime;
        pausedTime = 0;
    }
    startButton.textContent = 'Pause';
    resetButton.classList.remove('dont-show');
    lapsButton.classList.remove('dont-show');
    updateStopwatch();
}

// Function to pause the stopwatch
function pauseStopwatch() {
    isRunning = false;
    pausedTime += Date.now() - startTime;
    startButton.textContent = 'Resume';
}

// Function to update the stopwatch display
function updateStopwatch() {
    if (isRunning) {
        const currentTime = Date.now() - startTime;
        const formattedTime = formatTime(currentTime);
        displayTime(formattedTime);
        requestAnimationFrame(updateStopwatch);
    }
}

// Function to format the time in minutes, seconds, and milliseconds
function formatTime(time) {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const miliseconds = Math.floor((time % 1000) / 10);

    return {
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        miliseconds: String(miliseconds).padStart(2, '0'),
    };
}

// Function to display the formatted time
function displayTime({ minutes, seconds, miliseconds }) {
    minutesElement.textContent = `${minutes}:`;
    secondsElement.textContent = `${seconds}:`;
    milisecondsElement.textContent = miliseconds;
}

// Function to reset the stopwatch
function resetStopwatch() {
    isRunning = false;
    pausedTime = 0;
    startButton.textContent = 'Start';
    resetButton.classList.add('dont-show');
    lapsButton.classList.add('dont-show');
    displayTime({ minutes: '00', seconds: '00', miliseconds: '00' });
    lapNumber = 1;
    clearAllLaps();
}

// Function to record lap time
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('div');
        lapItem.classList.add('lap-stops', 'block');
        lapItem.innerHTML = `<span class="rank">${lapNumber++}) </span>
                             <span class="value">${lapTime.minutes}:${lapTime.seconds}:${lapTime.miliseconds}</span>`;
        lapsContainer.appendChild(lapItem);
    }
}

// Function to clear all lap times
function clearAllLaps() {
    lapsContainer.innerHTML = '';
    lapNumber = 1;
}
