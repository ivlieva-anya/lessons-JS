' use strict ';
window.addEventListener('DOMContentLoaded', function () {
    const headerBtn =document.querySelector('.header_btn'),
    popupEngineer= document.querySelector('.popup_engineer'),
    popupClose=document.querySelectorAll('.popup_close'),
    popupForm=document.querySelectorAll('.popup_form'),
    contactUs=document.querySelectorAll('.contact_us, .phone_link'),
    popup= document.querySelector('.popup')

    function showPopup(elemClick, elemOpen, styleElem='flex'){
        elemClick.addEventListener('click', (e)=>{
            e.preventDefault();
            elemOpen.style.display=styleElem;
        })
    }
    function closedPopup(elemClick, elemClosed){
        elemClick.addEventListener('click', ()=>{
            elemClosed.style.display='none';

        })
    }
    function closedOverlayPopup(elemClosed,elem){
       elemClosed.addEventListener('click', ({target})=>{
           console.log(elem)
           if(!elem.contains(target)){
               elemClosed.style.display='none';
           }
       }) 
    }
    showPopup(headerBtn, popupEngineer);
    closedPopup(popupClose[1],popupEngineer)
    closedOverlayPopup(popupEngineer,popupForm[1])
    contactUs.forEach(item=>{
        showPopup(item, popup);
        closedPopup(popupClose[0],popup);
        closedOverlayPopup(popup,popupForm[0])
    })

 //form

    let messange = {
        loading: 'Загрузка',
        success: 'Спасибо!Скоро мы с вами свяжемся!',
        failur: 'Что-то пошло не так...'
    };

    function phoneNumberVerification(input) {
        input.addEventListener('input', event=>{
            let str = '0123456789+-)(';
            if (str.indexOf(event.data, 0) === -1 ) {
                input.value = input.value.substr(0, input.value.length - 1);
            };
        });
    };
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
            }
            let clearForm = clearInput.bind(this);

            let formData = new FormData(form);
            postData(formData)
                .then(() => statusMessange.innerHTML = messange.success)
                .catch(() => statusMessange.innerHTML = messange.failur)
                .then(() => clearForm());
        });
    }
    let  statusMessange = document.createElement('div');
    statusMessange.classList.add('status');

    const userPhone = document.querySelectorAll('[name=user_phone]'),
        form=document.querySelectorAll('.form')
    userPhone.forEach(item=>{
        phoneNumberVerification(item); 
    });
    form.forEach(item=>{
        sendForm(item);
    })
     
});