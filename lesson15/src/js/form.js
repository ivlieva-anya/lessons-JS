//form
export function Form() {


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
}
