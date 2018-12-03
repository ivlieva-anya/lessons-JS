window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target === tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    //Timer
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

    //modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        rip = document.querySelectorAll('.description-btn'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function()  {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';

    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';

    });
    rip.forEach((item) => {
        item.addEventListener('click',function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            close.classList.remove('more-splash');
            document.body.style.overflow = 'hidden';

        });
    });
    //form
    let messange = {
        loading: 'Загрузка',
        success: 'Спасибо!Скоро мы с вами свяжемся!',
        failur: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessange = document.createElement('div');

    statusMessange.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessange);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        let formData = new FormData(form);
        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
        request.send(json);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessange.innerHTML = messange.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessange.innerHTML = messange.success;
            } else {
                statusMessange.innerHTML = messange.failur;

            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';

        }
    });

    input[0].addEventListener('input', function(event){
        let str = '0123456789+-)(';
        if(str.indexOf(event.data,0) === -1 || input[0].value.length>16){
            input[0].value.length>16 ? statusMessange.textContent='Длинна номера не более 16 симв.': statusMessange.textContent='Можно вводить только цифры и символы +- ( )';
            input[0].value = input[0].value.substr(0,input[0].value.length-1);
            form.appendChild(statusMessange);
        } else{
            statusMessange.textContent='';
        }
    });
});