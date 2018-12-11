//form
export function Form() {


    let messange = {
        loading: 'Загрузка',
        success: 'Спасибо!Скоро мы с вами свяжемся!',
        failur: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessange = document.createElement('div'),
        inputLastForm = document.querySelectorAll('#form input'),
        lastForm = document.querySelector('#form');
    statusMessange.classList.add('status');

    function phoneNumberVerification(input) {
        input.addEventListener('input', function (event) {
            let str = '0123456789+-)(';
            if (str.indexOf(event.data, 0) === -1 || input.value.length > 16) {
                input.value.length > 16 ? statusMessange.textContent = 'Длинна номера не более 16 симв.' : statusMessange.textContent = 'Можно вводить только цифры и символы +- ( )';
                input.value = input.value.substr(0, input.value.length - 1);
                form.appendChild(statusMessange);
            } else {
                statusMessange.textContent = '';
            }
        });
    }
    phoneNumberVerification(input[0]);
    phoneNumberVerification(inputLastForm[1]);

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
    sendForm(form);
    sendForm(lastForm);
}
