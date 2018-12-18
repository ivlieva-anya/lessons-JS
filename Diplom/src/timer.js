export function timer() {
    
let deadline = '2018-12-31';

function lowTen(d) {
    if (d < 10) {return ('0' + d)} else {return d};
}
const offset = new Date().getTimezoneOffset()/60;
function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = lowTen(Math.floor((t / 1000) % 60)),
        minutes = lowTen(Math.floor((t / 1000 / 60) % 60)),
        hours = lowTen(Math.floor((t / (1000 * 60 * 60))%24)+offset),
        days = lowTen(Math.floor(((t / (1000 * 60 * 60))+offset) / 24));
    return {
        'total': t,
        'days' : days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function setClock(endtime) {
    let days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes span'),
        seconds = document.querySelector('#seconds span'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
        let t = getTimeRemaining(endtime);
        days.textContent = t.days;
        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;
        if (t.total <= 0) {
            clearInterval(timeInterval);
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';

        }
    }
    updateClock();
}
setClock(deadline);
}
