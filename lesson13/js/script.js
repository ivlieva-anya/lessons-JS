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

    more.addEventListener('click', function () {
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
        item.addEventListener('click', function () {
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

    function tel() {
        input[0].addEventListener('input', function (event) {
            let str = '0123456789+-)(';
            if (str.indexOf(event.data, 0) === -1 || input[0].value.length > 16) {
                input[0].value.length > 16 ? statusMessange.textContent = 'Длинна номера не более 16 симв.' : statusMessange.textContent = 'Можно вводить только цифры и символы +- ( )';
                input[0].value = input[0].value.substr(0, input[0].value.length - 1);
                form.appendChild(statusMessange);
            } else {
                statusMessange.textContent = '';
            }
        });
    }
    tel();

    function sendForm(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.appendChild(statusMessange);

            function postData(data) {
                return new Promise(function (res, rej) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            statusMessange.innerHTML = messange.loading;
                        } else if (request.readyState === 4 && request.status == 200) {
                            res();
                        } else {
                            rej();
                        }
                    };
                    request.send(data);
                });
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }


            let formData = new FormData(form);
            postData(formData)
                .then(() => statusMessange.innerHTML = messange.success)
                .catch(() => statusMessange.innerHTML = messange.failur)
                .then(() => clearInput());
        });
    }
    sendForm(form);
    //Slider
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        next = document.querySelector('.next'),
        prev = document.querySelector('.prev'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');
        dots.forEach(item => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    prev.addEventListener('click', function () {
        plusSlides(-1);
    });
    next.addEventListener('click', function () {
        plusSlides(1);
    });
    dotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });
   //Calc
   let persons = document.querySelectorAll('.counter-block-input')[0],
   restDays = document.querySelectorAll('.counter-block-input')[1],
   personsAll = document.querySelectorAll('.counter-block-input'),
   place = document.getElementById('select'),
   totalValue = document.getElementById('total'),
   personSum = 0,
   daySum = 0,
   total = 0;
totalValue.innerHTML = 0;

function mm() {
   personsAll.forEach((pers)=>{
       pers.addEventListener('input', function (e) {
           console.log(pers.value);
           let num = '123456789';
           if (num.indexOf(e.data, 0) < 0) {
               pers.value = pers.value.substr(0, pers.value.length - 1);
           }
       });
   });
}
mm();

persons.addEventListener('change', function () {

   personSum = + this.value;
   total = daySum * personSum * 4000;
   if (restDays.value == '') {
       totalValue.innerHTML = 0;
   } else {
       totalValue.innerHTML = total;
   }
});

restDays.addEventListener('change', function (e) {
   console.dir(e.currentTarget.value);
   daySum = +this.value;
   total = daySum * personSum * 4000;
   if (persons.value == ''&& this.value != '') {
       totalValue.innerHTML = 0;
   } else {
       totalValue.innerHTML = total;
   }
});


place.addEventListener('change', function () {
   if (restDays.value == '' || persons.value == '') {
       totalValue.innerHTML = 0;
   } else {
       let a = total;
       totalValue.innerHTML = a * this.options[this.selectedIndex].value;
   }
});

});