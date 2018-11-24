' use strict ';
let startBtn = document.getElementById('start');
let value = document.getElementsByClassName('result-table')[0].childNodes;
let arrValue = {};
for (let i = 0; i < value.length; i++) {
    if (value[i].nodeName != '#text') {
        if (value[i].classList.item(0).indexOf("-value") != -1) {
            arrValue[value[i].classList.item(0).replace('-v', 'V')] = value[i];
        }
    }
}

let button1, button2, button3;
button1 = document.querySelector('.expenses-item-btn');
button2 = document.querySelector('.optionalexpenses-btn');
button3 = document.querySelector('.count-budget-btn');

// console.log(button1, button2);
let ff = document.querySelectorAll('.optionalexpenses-item');
// console.log(ff);
let income = document.querySelector('#income');
let savings = document.querySelector('#savings');
let sum = document.querySelector('#sum');
let percent = document.querySelector('#percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');
let expensesItem = document.getElementsByClassName('expenses-item');

let money, time;
button1.setAttribute('disabled', 'disabled');
button2.setAttribute('disabled', 'disabled');
button3.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', function () {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData = time;
    arrValue['budgetValue'].innerText = appData.budget.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    button3.removeAttribute('disabled', 'disabled');

    button1.addEventListener('click', function () {
        let bugetSum = 0;
        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
            if ((typeof (a)) != null && (typeof (b)) != null && !(isNaN(b)) &&
                a != '' && b != '' && a.length < 50) {
                // console.log("done"); 
                appData.expenses[a] = b;
                bugetSum += +b;
            } else {}
        };
        button1.removeAttribute('disabled');
        arrValue['expensesValue'].textContent = bugetSum;
    });
});
button2.addEventListener('click', function () {
    for (let i = 0; i < ff.length; i++) {
        let a = ff[i].value;
        appData.optionalExpenses[i] = a;
        arrValue['optionalexpensesValue'].textContent += appData.optionalExpenses[i] + ' ';
    }

});
button3.addEventListener('click', function () {
    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget - arrValue['expensesValue'].textContent / 30).toFixed();
        arrValue['daybudgetValue'].textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            arrValue['levelValue'].textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay < 2000) {
            arrValue['levelValue'].textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            arrValue['levelValue'].textContent = "Высокий уровень достатка";
        } else {
            arrValue['levelValue'].textContent = "Произошла ошибка";
        }
    } else {
        arrValue['daybudgetValue'].textContent = "Произошла ошибка";
    }
});
income.addEventListener('input', function () {
    let items = income.value;
    appData.income = items.split(',');
    arrValue['incomeValue'].textContent = appData.income;
});
savings.addEventListener('click', function () {
    if (appData.savings === true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});
sum.addEventListener('input', function () {
    if (appData.savings === true) {
        let s = +sum.value,
            p = +percent.value;
        appData.monthIncome = s / 100 / 12 * p;
        appData.yearIncome = s / 100 * p;
        arrValue['monthsavingsValue'].textContent = appData.monthIncome.toFixed(1);
        arrValue['yearsavingsValue'].textContent = appData.yearIncome.toFixed(1);

    }
});
percent.addEventListener('input', function () {
    if (appData.savings === true) {
        let s = +sum.value,
            p = +percent.value;
        appData.monthIncome = s / 100 / 12 * p;
        appData.yearIncome = s / 100 * p;

        arrValue['monthsavingsValue'].textContent = appData.monthIncome.toFixed(1);
        arrValue['yearsavingsValue'].textContent = appData.yearIncome.toFixed(1);
    }
});
for (let i = 0; i < expensesItem.length; i++) {
    expensesItem[i].addEventListener('change', function (event) {
        // console.log(button3.hasAttribute('disabled'))
        if (expensesItem[i] != '' && !button3.hasAttribute('disabled')) {
            button1.removeAttribute('disabled');
        }
    });
}
for (let i = 0; i < expensesItem.length; i++) {
    expensesItem[i].addEventListener('change', function (event) {
        // console.log(button3.hasAttribute('disabled'))
        if (expensesItem[i] != '' && !button3.hasAttribute('disabled')) {
            button1.removeAttribute('disabled');
        }
    });
}
for (let i = 0; i < ff.length; i++) {
    ff[i].addEventListener('change', function (event) {
        // console.log(button3.hasAttribute('disabled'))
        if (ff[i] != '' && !button1.hasAttribute('disabled')) {
            button2.removeAttribute('disabled');
        }
    });
}

let appData = {
    budget: money,
    timeData: 0,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};