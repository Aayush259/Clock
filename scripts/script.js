const Hour = document.getElementById('hour');
const Minute = document.getElementById('minute');
const Second = document.getElementById('second');
const DateElement = document.getElementById('date');
const Day = document.getElementById('day');

setInterval(updateTime, 1000);

function updateTime() {
    
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const CurrentTime = new Date();

    Hour.innerHTML = CurrentTime.getHours();
    Minute.innerHTML = CurrentTime.getMinutes();
    Second.innerHTML = CurrentTime.getSeconds();
    DateElement.innerHTML = `${CurrentTime.getDate()}-${CurrentTime.getMonth()}-${CurrentTime.getFullYear()}`;
    Day.innerHTML = Days[CurrentTime.getDay()];

}