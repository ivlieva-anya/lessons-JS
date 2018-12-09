//Timer
export function timer() {
    let deadline = '2018-12-21';

    function ii(d) {
        if (d < 10) {
            return ('0' + d);
        } else {
            return d;
        }

    }

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = ii(Math.floor((t / 1000) % 60)),
            minutes = ii(Math.floor((t / 1000 / 60) % 60)),
            hours = ii(Math.floor((t / (1000 * 60 * 60))));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

            }
        }
        updateClock();
    }
    setClock('timer', deadline);
}
