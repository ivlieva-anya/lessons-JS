let start = document.getElementById('start');
let value = document.getElementsByClassName('result-table')[0].childNodes;
for (let i = 0; i < value.length; i++) {
    if (value[i].nodeName != '#text') {
        if (value[i].classList.item(0).indexOf("-value") != -1) {
            console.log(value[i]);
        }
    }
}
let expensesItem = document.getElementsByClassName('expenses-item');

let button1, button2;
let buttons = document.getElementsByTagName('button');
for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].innerText === 'Утвердить') {
        button1 = buttons[i]
    }
    if (buttons[i].innerText === 'Рассчитать') {
        button2 = buttons[i]
    }
}

console.log(button1, button2);
let ff = document.querySelectorAll('.optionalexpenses-item');
console.log(ff);
let income = document.querySelector('#income');
let savings = document.querySelector('#savings');
let sum = document.querySelector('#sum');
let percent = document.querySelector('#percent');
let yearValue = document.querySelector('input .year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');