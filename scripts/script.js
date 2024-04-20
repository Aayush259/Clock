// Getting clock container.
const ClockContainer = document.getElementById('clock');

// Getting buttons inside clock-features elements.
const Clock = document.getElementById('time');
const StopWatch = document.getElementById('stopwatch');
const Timer = document.getElementById('timer');

/*
    This function updates the time in clock.
*/
function updateTime() {
    // Getting Hour, Minute, Second, DateElement and Day from DOM.
    const Hour = document.getElementById('hour');
    const Minute = document.getElementById('minute');
    const Second = document.getElementById('second');
    const DateElement = document.getElementById('date');
    const Day = document.getElementById('day');

    // Array of days in a week.
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Current time.
    const CurrentTime = new Date();

    // Updating TimeRanges, date, and other things.
    Hour.innerHTML = (CurrentTime.getHours()).toString().padStart(2, '0');
    Minute.innerHTML = (CurrentTime.getMinutes()).toString().padStart(2, '0');
    Second.innerHTML = (CurrentTime.getSeconds()).toString().padStart(2, '0');
    DateElement.innerHTML = `${CurrentTime.getDate()}-${CurrentTime.getMonth()}-${CurrentTime.getFullYear()}`;
    Day.innerHTML = Days[CurrentTime.getDay()];
}

/*
    This function starts, pause and resets the stop watch.
*/
const StartStopWatch = () => {

    // Getting MinuteTimer, SecondTimer, MilliSecondTimer elements.
    const MinuteTimer = document.getElementById('minute-timer');
    const SecondTimer = document.getElementById('second-timer');
    const MilliSecondTimer = document.getElementById('millisecond-timer');

    // Getting pause button.
    const PauseButton = document.getElementById('pause');

    // Getting play button and reset button.
    const PlayButton = document.getElementById('play');
    const ResetButton = document.getElementById('reset');

    // Removing none-display class from pause button.
    PauseButton.classList.remove('none-display');

    // Starting millisecond timer.
    let msTimer = setInterval(() => {

        // If timer has number greater than 99 then reset it to 00 else increments it by one.
        if (MilliSecondTimer.innerHTML >= 99) {
            MilliSecondTimer.innerHTML = '00';
        } else {
            MilliSecondTimer.innerHTML = (parseInt(MilliSecondTimer.innerHTML) + 1).toString().padStart(2, '0');
        }
    }, 1);

    // Starting second timer.
    let sTimer = setInterval(() => {

        // If secondtimer has number greater than or equal to 59, then set it to 00 else increments it by one.
        if (SecondTimer.innerHTML >= 59) {
            SecondTimer.innerHTML = '00';
        } else {
            SecondTimer.innerHTML = (parseInt(SecondTimer.innerHTML) + 1).toString().padStart(2, '0');
        }
    }, 1000);

    // Starting minute timer.
    let mTimer = setInterval(() => {

        // Incrementing minute timer by one.
        MinuteTimer.innerHTML = (parseInt(MinuteTimer.innerHTML) + 1).toString().padStart(2, '0');
    }, 60000);

    // Adding event listener to pause button so that when it is clicked then clear all intervals.
    PauseButton.addEventListener('click', () => {

        // Hiding pause button.
        PauseButton.classList.add('none-display');

        // Clearing timer intervals.
        clearInterval(msTimer);
        clearInterval(sTimer);
        clearInterval(mTimer);

        // Displaying play button.
        PlayButton.classList.remove('none-display');

    })

    // Adding event listener to reset button to reset the stopwatch.
    ResetButton.addEventListener('click', () => {

        // Resetting stop watch.
        ResetButton.classList.add('none-display');
        activateStopWatch();
    });

}

function activateClock() {
    ClockContainer.innerHTML = `
    <h2 class="time">
        <span id="hour">00</span> :
        <span id="minute">00</span> :
        <span id="second">00</span>
    </h2>
    <div class="date-day">
        <span id="date"></span> |
        <span id="day"></span>
    </div>
    `;

    // Updating time after every second.
    setInterval(updateTime, 1000);
}

function activateStopWatch() {

    // Updating clock container.
    ClockContainer.innerHTML = `
    <div class="time">
        <span id="minute-timer">00</span> :
        <span id="second-timer">00</span> :
        <span id="millisecond-timer">00</span>
    </div>

    <div class="stopwatch-controls flex">
        <button id="pause" class="none-display">
            <img src="./images/pause-icon.svg" alt="Reset" height="30">
        </button>
        <button id="play">
            <img src="./images/play-icon.svg" alt="Start or Stop" height="30">
        </button>
        <button id="reset" class="none-display">
            <img src="./images/reset.svg" alt="Reset" height="30">
        </button>
    </div>
    `;

    // Getting play button and reset button.
    const PlayButton = document.getElementById('play');
    const ResetButton = document.getElementById('reset');

    // Adding event listener to play button to start timer.
    PlayButton.addEventListener('click', () => {

        // Hiding play button.
        PlayButton.classList.add('none-display');

        // Displaying reset button.
        ResetButton.classList.remove('none-display');

        // Starting timer.
        StartStopWatch();
    })
}

// Activate clock at starting.
activateClock();

Clock.addEventListener('click', activateClock);

StopWatch.addEventListener('click', activateStopWatch)

Timer.addEventListener('click', () => {console.log('Timer')});
