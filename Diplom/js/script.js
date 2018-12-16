' use strict ';
window.addEventListener('DOMContentLoaded', function () {
    const popupEngineerBtn = document.querySelector('.popup_engineer_btn'),
        popupEngineer = document.querySelector('.popup_engineer'),
        phoneLink = document.querySelectorAll('.phone_link'),
        contactUsWrap = document.querySelector('.contact_us_wrap')
        popup = document.querySelector('.popup'),
        form = document.querySelectorAll('.dontclose'),
        inputPhone = document.querySelectorAll('.input_phone'),
        formToServ = document.querySelectorAll('form'),
        popupClose = document.querySelectorAll('.popup_close');

    //popup 
    function setClosePopup(elem, elemClosed) {
        elem.addEventListener('click', function ({target}) {
            clearAllCalc ();
            elemClosed.style = "display : none";
            document.body.style.overflow='auto';
        });
    };

    function setCloseAroundPopup(elem, elemClosed) {
        elem.addEventListener('click', function ({target}) {
            if (!elemClosed.contains(target)) {
                this.style = "display : none";
                document.body.style.overflow='auto';
            }
        });
    };

    function setOpenPopup(elem, elemOpened) {
        elem.addEventListener('click', (event) => {
            elemOpened.style.display = "flex";
            document.body.style.overflow='hidden';
            event.preventDefault();
        });
    };

    setOpenPopup(popupEngineerBtn, popupEngineer);
    phoneLink.forEach(item=>{
        setOpenPopup(item, popup);
    });
    setOpenPopup(contactUsWrap, popup);
    
    setCloseAroundPopup(popupEngineer, form[1]);
    setCloseAroundPopup(popup, form[0]);

    popupClose.forEach((item) => {
        setClosePopup(item, popupEngineer)
    });

    //form
    function phoneNumberVerification(input) {
        input.addEventListener('input', function ({data}) {
            const str = '0123456789';
            if (str.indexOf(data, 0) === -1 || this.value.length > 16) {
                this.value = this.value.substr(0, this.value.length - 1);
            }
        });
    }
    inputPhone.forEach(item => phoneNumberVerification(item));

    const messange = {
        loading: 'Загрузка',
        success: 'Спасибо!Скоро мы с вами свяжемся!',
        failur: 'Что-то пошло не так...'
    };
    let statusMessange = document.createElement('div');

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
                let input = this.querySelectorAll('input');
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
                if(this.classList.contains('calc_form')){
                    clearAllCalc (); 
                } 
            }
            let clearForm = clearInput.bind(this);

            let formData = new FormData(form);
            if(form.classList.contains('calc_form')){
                for (var key in calcData) {
                    if(key !="name" && key !="phone" && key !='clear'){
                        formData.append(key, calcData[key]);
                    }
                }
            }
            postData(formData)
                .then(() => statusMessange.innerHTML = messange.success)
                .catch(() => statusMessange.innerHTML = messange.failur)
                .then(() => clearForm());
        });
    }
    formToServ.forEach(item => sendForm(item));

//tabs

    const info = document.querySelector('.slick-list'),
        tabContent = document.querySelectorAll('.glazing .container .row'),
        tab = document.querySelectorAll('.glazing_block ');
     let rez =0;
    function superTabs(info, tabContent, tab, classTab, show, slickCurrent) {
       
        function hideTabContent(a) {
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove(show);
                tabContent[i].classList.add('hide');
                if (classTab === 'decoration_item'){
                    tab[i].children[0].classList.remove(slickCurrent)
                } else {
                    tab[i].classList.remove(slickCurrent);
                }
            }
        }
        hideTabContent(1);
        tab[0].classList.add(slickCurrent);

        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add(show);
                if (classTab === 'decoration_item'){
                    tab[b].children[0].classList.add(slickCurrent)
                } else {
                    tab[b].classList.add(slickCurrent);
                }
            };
        };
        
        info.addEventListener('click', function (event) {
            event.preventDefault();
            for (let i = 0; i < tab.length; i++) {
                if (tab[i].contains(event.target)) {
                    hideTabContent(0);
                    showTabContent(i);
                    if (slickCurrent==='slick-current'){
                        calcData.globtype = tab[i].getAttribute('data-slick-index');
                    }
                    if (classTab === 'window'){
                        calcData.model = i;
                    };
                    break;
                };
            };
        });
    };
    superTabs(info, tabContent, tab, 'glazing_block', 'show', 'slick-current');

//calk

    const popupCalcBtn = document.querySelectorAll('.popup_calc_btn'),
        popupCalc = document.querySelector('.popup_calc '),
        popupCalcClose = document.querySelector('.popup_calc_close'),
        balconIcons = document.querySelector('.balcon_icons'),
        bigImg = document.querySelectorAll('.big_img img'),
        imgTab = balconIcons.querySelectorAll('a img'),
        onlyDigit = document.querySelectorAll('.only-digit'),
        popupCalcButton = document.querySelector('.popup_calc_button'),
        popupCalcProfile = document.querySelector('.popup_calc_profile'),
        checkbox = document.querySelectorAll('.checkbox'),
        popupCalcProfileClose = document.querySelector('.popup_calc_profile_close'),
        popupCalcProfileButton = document.querySelector('.popup_calc_profile_button'),
        popupCalcEnd = document.querySelector('.popup_calc_end '),
        popupCalcEndClose = document.querySelector('.popup_calc_end_close'),
        inputWigth = document.querySelector('#width'),
        inputHeight = document.querySelector('#height'),
        viewType = document.querySelector('#view_type'),
        userName = document.querySelector('#user_name'),
        userPhone = document.querySelector('#user_phone'),
        calcSubmit = document.querySelector('#calc-submit')

    let calcData = {
        globtype : 0,
        model : 1,
        width : 0,
        height :0,
        glazing : 0,
        type : 0,
        name : '',
        phone : '',
        clear : function (){
            this.model = 1;
            this.width = 0;
            this.height =0;
            this.glazing = 0;
            this.type = 0;
            this.name = '';
            this.phone = '';
        }
    }    
    function clearAllCalc (){
        calcData.clear();
        const allCalc = document.querySelectorAll('.popup_calc_content, .popup_calc_profile_content, .popup_calc_end .popup_content')
        allCalc.forEach(item=>{
            const input = item.querySelectorAll('input,select,div.balcon_icons');
            for (let i = 0; i < input.length; i++) {
                if (input[i].localName ==='input'){
                    if (input[i].type ==='checkbox'){
                    input[i].checked = false;
                    } else {
                    input[i].value = '';
                    }
                } else if (input[i].localName ==='div'){
                    const aCleare = input[i].querySelectorAll('img');
                    aCleare.forEach(item=>{
                        item.classList.remove('do_image_more');
                    });
                    aCleare[0].classList.add('do_image_more');
                }else if (input[i].localName ==='select'){
                input[i].value = 'tree';
                }
           }
        });
    }
    setClosePopup(popupCalcClose, popupCalc);
    setClosePopup(popupCalcProfileClose, popupCalcProfile);
    setClosePopup(popupCalcEndClose, popupCalcEnd);

    popupCalcBtn.forEach(element => {
        setOpenPopup(element, popupCalc)
    });

    function onlydiget() {
        onlyDigit.forEach((pers) => {
            pers.addEventListener('input', function (e) {
                let num = '1234567890';
                if (num.indexOf(e.data, 0) < 0) {
                    pers.value = pers.value.substr(0, pers.value.length - 1);
                }
            });
        });
    }
    function setOpenClose(button,close,open){
        button.addEventListener('click', function (event) {
            close.style = "display : none";
            open.style = "display : flex";
        });
    };

    setOpenClose(popupCalcButton,popupCalc,popupCalcProfile);
    setOpenClose(popupCalcProfileButton,popupCalcProfile,popupCalcEnd);

    checkbox.forEach((item) => {
        item.addEventListener('click', function ({target}) {
            let number = 0;
            checkbox.forEach((i) => {
                number++;
                if (i === target) {
                    i.checked = true;
                     calcData.type = number;
                    } else i.checked = false;
            })
        })
    })
    onlydiget();
    superTabs(balconIcons, bigImg, imgTab, '', 'popup_calc_show', 'do_image_more');

    inputWigth.addEventListener('change',function(){
        calcData.width = this.value;
    })
    
    inputHeight.addEventListener('change',function(){
        calcData.height = this.value;
    })
    viewType.addEventListener('change',function(){
        calcData.glazing = this.value;
    })

    userName.addEventListener('change',function(){
        calcData.name = this.value;
    })

    userPhone.addEventListener('change',function(){
        calcData.phone = this.value;
    })

    sendForm(calcSubmit);
    const slickTrack = document.querySelector('.decoration_slider'), //зона табов
        track = document.querySelectorAll('.decoration_content_item'), // коллекция табов
        trackItem = slickTrack.querySelectorAll('.decoration_item') // открывающиеся табы
    superTabs(slickTrack, track, trackItem, 'decoration_item', 'show','after_click');

//timer
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
//foto
    const smalFoto = document.querySelectorAll('.works .container .row div'),
        popupFoto = document.querySelector('.popup-foto'),
        aFoto = document.querySelectorAll('.works .container .row div a'),
        modalImg = popupFoto.querySelector('img');

    aFoto.forEach(item=>{
        item.setAttribute('onclick','return false');
    })
    function showBigImg(event,item){
        item.addEventListener(event,({target})=>{
            popupFoto.style= "display : flex";
            let a =target.src.substr(target.src.indexOf('img/', 0)).split('/'),
                b= a.splice(2,0,'big_img');
            modalImg.setAttribute('src',a.join('/'))
            document.body.style.overflow='hidden';
        })
    }
    smalFoto.forEach(item=>{
        showBigImg('click',item);
    })
    setCloseAroundPopup(popupFoto, modalImg);
    setTimeout(()=>{
        popup.style.display = 'flex';
    },60000)
});