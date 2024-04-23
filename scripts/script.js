// Getting clock container.
const ClockContainer = document.getElementById('clock');

// Getting buttons inside clock-features elements.
const Clock = document.getElementById('time');
const StopWatch = document.getElementById('stopwatch');
const Timer = document.getElementById('timer');

const ActiveFeature = document.querySelector('#header > h1');

// Declaring clockTime which will be a time interval for clock.
var clockTime;

// This function enables all clock features buttons if they are disabled.
const EnableFeatureButtons = () => {
    Clock.disabled = false;
    StopWatch.disabled = false;
    Timer.disabled = false;
}

// This function disables all clock features button if they are enabled.
const DisableFeatureButtons = () => {
    Clock.disabled = true;
    StopWatch.disabled = true;
    Timer.disabled = true;
}

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

    // Disable all clock features when the stopwatch is running.
    DisableFeatureButtons();

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

    // Starting stopwatch.
    let msTimer = setInterval(() => {

        // If MilliSecondTimer has number greater than 99 then reset it to 00 and increase SecondTimer by 1 else increments MilliSecondTimer by one.
        if (parseInt(MilliSecondTimer.innerHTML) >= 99) {
            MilliSecondTimer.innerHTML = '00';
            SecondTimer.innerHTML = (parseInt(SecondTimer.innerHTML) + 1).toString().padStart(2, '0');
        } else {
            MilliSecondTimer.innerHTML = (parseInt(MilliSecondTimer.innerHTML) + 1).toString().padStart(2, '0');
        }

        // If SecondTimer is greater than 60 then reset it to 00 and increase MinuteTimer by 1.
        if (parseInt(SecondTimer.innerHTML) >= 60) {
            SecondTimer.innerHTML = '00';
            MinuteTimer.innerHTML = (parseInt(MinuteTimer.innerHTML) + 1).toString().padStart(2, '0');
        }
    }, 10);

    // Adding event listener to pause button so that when it is clicked then clear all intervals.
    PauseButton.addEventListener('click', () => {

        // Hiding pause button.
        PauseButton.classList.add('none-display');

        // Enable all clock features buttons when the stopwatch is paused.
        EnableFeatureButtons();

        // Clearing timer interval.
        clearInterval(msTimer);

        // Displaying play button.
        PlayButton.classList.remove('none-display');

    })

    // Adding event listener to reset button to reset the stopwatch.
    ResetButton.addEventListener('click', () => {

        // Enable all clock features buttons when the stopwatch is reset.
        EnableFeatureButtons();

        // Resetting stop watch.
        ResetButton.classList.add('none-display');
        activateStopWatch();
    });

}

/*
    This function starts the timer if everything is correct
*/
const StartTimer = () => {

    // Getting all input fields for hour, minute and second.
    const InputHour = document.getElementById('hour-input');
    const InputMinute = document.getElementById('minute-input');
    const InputSecond = document.getElementById('second-input');

    // Getting alarm sound.
    const AlarmSound = document.getElementById('alarm-sound');

    // This function plays the alarm when called.
    const PlayAlarm = () => {
        AlarmSound.play();
    }

    // Converting the string value of input fields into integer and storing in their respective variables.
    let HourTimer = parseInt(InputHour.value);
    let MinuteTimer = parseInt(InputMinute.value);
    let SecondTimer = parseInt(InputSecond.value);

    // Getting start and stop button.
    const StartButton = document.getElementById('timer-start-button');
    const StopButton = document.getElementById('timer-stop-button');

    /*
        If HourTimer and MinuteTimer and SecondTimer, all are not a valid integer at same time, then return from this function.
        If their values are zero or negative then return from this function. 
    */
    if (isNaN(HourTimer) && isNaN(MinuteTimer) && isNaN(SecondTimer)) {
        return;
    } else if (HourTimer <= 0 || SecondTimer <= 0 || MinuteTimer <= 0) {
        return;
    }
    
    // If everything is fine then hide start button and display stop button.
    StartButton.classList.add('none-display');
    StopButton.classList.remove('none-display');

    // If HourTimer, MinuteTimer or SecondTimer isNaN then make them zero.
    HourTimer = (isNaN(HourTimer)) ? 0 : HourTimer;
    MinuteTimer = (isNaN(MinuteTimer)) ? 0 : MinuteTimer;
    SecondTimer = (isNaN(SecondTimer)) ? 0 : SecondTimer;

    // Getting Hour, Minute, Second elements which will show countdown.
    const Hour = document.getElementById('hour-countdown');
    const Minute = document.getElementById('minute-countdown');
    const Second = document.getElementById('second-countdown');

    // If second count is greater than 60, then adjust it into minute.
    while (true) {
        if (SecondTimer >= 60) {
            SecondTimer -= 60;
            MinuteTimer += 1;
        } else {
            break;
        }
    }

    // If minute count is greater than 60, then adjust it into hour.
    while (true) {
        if (MinuteTimer >= 60) {
            MinuteTimer -= 60;
            HourTimer += 1;
        } else {
            break;
        }
    }

    // Initializing countdown of Hour, Minute and Second elements.
    Hour.textContent = HourTimer.toString().padStart(2, '0');
    Minute.textContent = MinuteTimer.toString().padStart(2, '0');
    Second.textContent = SecondTimer.toString().padStart(2, '0');

    InputHour.value = '';
    InputMinute.value = '';
    InputSecond.value = '';

    // Disable all clock features buttons when the timer is running.
    DisableFeatureButtons();
    
    // Starting countdown using setInterval.
    let countdown = setInterval(() => {
        
        // Decreasing SecondTimer by 1.
        SecondTimer = SecondTimer - 1;

        /*
            If SecondTimer is smaller than zero and MinuteTimer is greater than 0, then set SecondTimer to 59 and Decrease MinuteTimer by one.
            If SecondTimer, MinuteTimer and HourTimer are smaller than 1 then countdown is finished, so hide stop button and show start button.
        */
        if ((SecondTimer < 0) && (MinuteTimer >= 1)) {
            SecondTimer = 59;
            MinuteTimer -= 1;
        } else if ((SecondTimer <= 0) && (MinuteTimer < 1) && (HourTimer < 1)) {
            clearInterval(countdown);
            
            AlarmSound.currentTime = 2.3;
            AlarmSound.play()

            AlarmSound.addEventListener('ended', PlayAlarm);

            // StopButton.classList.add('none-display');
            // StartButton.classList.remove('none-display');
        }

        // If SecondTimer is smaller than 0 or MinuteTimer is smaller than 0 and HourTimer is greater than 0 the reset MinuteTimer and SecondTimer to 59 and decrease HourTimer by 1.
        if (((SecondTimer < 0) || (MinuteTimer < 0)) && (HourTimer >= 1)) {
            MinuteTimer = 59;
            SecondTimer = 59;
            HourTimer -= 1;
        }

        // Updating the Hour, Minute and Second countdown on screen every second.
        Hour.textContent = HourTimer.toString().padStart(2, '0');
        Minute.textContent = MinuteTimer.toString().padStart(2, '0');
        Second.textContent = SecondTimer.toString().padStart(2, '0');
        
    }, 1000);

    // Adding event listener to stop button so that when it is clicked, it stops the countdown.
    StopButton.addEventListener('click', () => {

        // Pause alarm and remove event listener from it to stop playing alarm continuously.
        AlarmSound.pause();
        AlarmSound.removeEventListener('ended', PlayAlarm);
        
        // Enable all clock features buttons when the timer is stopped.
        EnableFeatureButtons();
        
        // Hiding stop button and displaying start button.
        StopButton.classList.add('none-display');
        StartButton.classList.remove('none-display');

        // Clearing countdown interval.
        clearInterval(countdown);

        // Resetting Hour, Minute and Second on screen.
        Hour.textContent = '00';
        Minute.textContent = '00';
        Second.textContent = '00';
    })
}

function activateClock() {

    // Setting title.
    ActiveFeature.innerText = 'Clock';

    // Change background of button by adding active-button class and remove background of remaining two buttons.
    Clock.classList.add('active-button');
    Timer.classList.remove('active-button');
    StopWatch.classList.remove('active-button');

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
    clockTime = setInterval(updateTime, 1000);
}

function activateStopWatch() {

    // Setting title.
    ActiveFeature.innerText = 'Stopwatch';

    // Clearing clockTime when StopWatch is activated.
    clearInterval(clockTime);

    // Change background of button by adding active-button class and remove background of remaining two buttons.
    StopWatch.classList.add('active-button');
    Clock.classList.remove('active-button');
    Timer.classList.remove('active-button');

    // Updating clock container.
    ClockContainer.innerHTML = `
    <div class="time">
        <span id="minute-timer">00</span> :
        <span id="second-timer">00</span> :
        <span id="millisecond-timer">00</span>
    </div>

    <div class="stopwatch-controls flex">
        <button id="pause" class="none-display">
            <img src="./images/pause-icon.svg" alt="Pause" height="30">
        </button>
        <button id="play">
            <img src="./images/play-icon.svg" alt="Start" height="30">
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

function activateTimer() {

    // Setting title.
    ActiveFeature.innerText = 'Timer';
    
    // Clearing clockTime when Timer is activated.
    clearInterval(clockTime);

    // Change background of button by adding active-button class and remove background of remaining two buttons.
    Timer.classList.add('active-button');
    Clock.classList.remove('active-button');
    StopWatch.classList.remove('active-button');
    
    ClockContainer.innerHTML = `
    <div class="time-input flex">

        <div class="hour-input-container flex">
            <label for="hour-input" class="timer-label">Hour</label>
            <input type="number" min="1" name="hour" id="hour-input" placeholder="0" class="timer-input">
        </div>

        <div class="minute-input-container flex">
            <label for="minute-input" class="timer-label">Minute</label>
            <input type="number" min="1" name="minute" id="minute-input" placeholder="0" class="timer-input">
        </div>

        <div class="second-input-container flex">
            <label for="second-input" class="timer-label">Second</label>
            <input type="number" min="1" name="second" id="second-input" placeholder="0" class="timer-input">
        </div>

    </div>

    <button id="timer-start-button">Start</button>
    <button id="timer-stop-button" class="none-display">Stop</button>

    <div class="timer-output-container time">
        <span id="hour-countdown">00</span> :
        <span id="minute-countdown">00</span> :
        <span id="second-countdown">00</span>
    </div>

    <audio id="alarm-sound" src="./Sound/Alarm.mp3" style="display: none;" controls preload="auto"></audio>
    `

    const StartButton = document.getElementById('timer-start-button');

    StartButton.addEventListener('click', () => {
        
        StartTimer();
        
    })

}

// Activate clock at starting.
activateClock();

Clock.addEventListener('click', activateClock);

StopWatch.addEventListener('click', activateStopWatch)

Timer.addEventListener('click', activateTimer);
