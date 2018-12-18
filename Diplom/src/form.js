import {calcData,clearAllCalc} from './calcdata';

export function sendForm(form) {
    const statusMessange = document.createElement('div'),

    messange = {
        loading: 'Загрузка',
        success: 'Спасибо!Скоро мы с вами свяжемся!',
        failur: 'Что-то пошло не так...'
    };

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
        let clearForm = clearInput.bind(this),
         formData = new FormData(form);
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

export function form11() {
    
   //form
    function phoneNumberVerification(input) {
        input.addEventListener('input', function ({data}) {
            const str = '0123456789';
            if (str.indexOf(data, 0) === -1 || this.value.length > 16) {
                this.value = this.value.substr(0, this.value.length - 1);
            }
        });
    }
    const formToServ = document.querySelectorAll('form'),
    inputPhone = document.querySelectorAll('.input_phone');
    
    inputPhone.forEach(item => phoneNumberVerification(item));

    formToServ.forEach(item => sendForm(item));
} 
