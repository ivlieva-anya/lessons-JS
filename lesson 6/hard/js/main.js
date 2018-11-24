let money, time;
let appData = {
    budget: money,
    timeData: 0,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

let start = document.getElementById('start');
let value = document.getElementsByClassName('result-table')[0].childNodes;
let arrValue = {};
for (let i = 0; i < value.length; i++) {
    if (value[i].nodeName != '#text') {
        if (value[i].classList.item(0).indexOf("-value") != -1) {
            arrValue[value[i].classList.item(0).replace('-v', 'V')] = value[i]
        }
    }
}
let expensesItem = document.getElementsByClassName('expenses-item');

let button1 =  document.querySelector('.expenses-item-btn'),
    button3 = document.querySelector('.optionalexpenses-btn'),
    button2 = document.querySelector('.count-budget-btn');

let optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item');
let income = document.querySelector('#income');
let savings = document.querySelector('#savings');
let sumValue = document.querySelector('#sum');
let percentValue = document.querySelector('#percent');
let yearValue = document.querySelector('input.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');

start.addEventListener('click', () => {
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
    button3.removeAttribute("disabled");
    // button1.removeAttribute("disabled");
});

button1.addEventListener('click', () => {
    let sum = 0,
        j = 1;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = +expensesItem[++i].value;
        if ((typeof (a)) != null && (typeof (b)) != null && !(isNaN(b)) &&
            a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += b;
        } else {
            appData.expenses[j++] = 0;
            sum += 0;
        }
    }
    arrValue['expensesValue'].innerText = sum;
    button2.removeAttribute("disabled");
});
button3.addEventListener('click', () => {
    arrValue['optionalexpensesValue'].textContent="";
    for (let i = 0; i < optionalexpensesItem.length; i++) {
        appData.optionalExpenses[i] = optionalexpensesItem[i].value;
        arrValue['optionalexpensesValue'].textContent += optionalexpensesItem[i].value + ' ';
    }
});
button2.addEventListener('click', () => {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - arrValue['expensesValue'].innerText) / 30).toFixed();
        arrValue['daybudgetValue'].innerText = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            arrValue['levelValue'].innerText = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay < 2000) {
            arrValue['levelValue'].innerText = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            arrValue['levelValue'].innerText = "Высокий уровень достатка";
        } else {
            arrValue['levelValue'].innerText = "Произошла ошибка";
        }
    } else {
        arrValue['budgetValue'].innerText = "Произошла ошибка";
    }
});
income.addEventListener('input', () => {
    let items = income.value;
    if ((typeof (items)) === 'string' && items != null && items != "") {
        appData.income = items.split(', ');
    }
    arrValue['incomeValue'].textContent = appData.income;
});
savings.addEventListener('click', () => {
    if (appData.savings) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});
sumValue.addEventListener('input', () => {
    if (appData.savings) {
        let sum = +sumValue.value;
        let persent = +percentValue.value;
        appData.monthIncome = sum / 100 / 12 * persent;
        appData.yearIncome = sum / 100 * persent;
        arrValue['monthsavingsValue'].innerText = appData.monthIncome.toFixed(1);
        arrValue['yearsavingsValue'].innerText = appData.yearIncome.toFixed(1);
    }
});
percentValue.addEventListener('input', () => {
    if (appData.savings) {
        let sum = +sumValue.value;
        let persent = +percentValue.value;
        appData.monthIncome = sum / 100 / 12 * persent;
        appData.yearIncome = sum / 100 * persent;
        arrValue['monthsavingsValue'].innerText = appData.monthIncome.toFixed(1);
        arrValue['yearsavingsValue'].innerText = appData.yearIncome.toFixed(1);
    }
});
button1.setAttribute("disabled", "disabled");
button2.setAttribute("disabled", "disabled");
button3.setAttribute("disabled", "disabled");
for (let i = 0; i < expensesItem.length; i++) {
    expensesItem[i].addEventListener('change', () => {
        let flag = 0;
        for (let i = 0; i < expensesItem.length; i++) {
            // console.log(expensesItem[i].value);
            if (expensesItem[i].value != '') flag = 1;
        };
        if (flag === 0) {
            button1.setAttribute("disabled", "disabled");
        } else {
            button1.removeAttribute("disabled");
        };
    });
    if(i%2 !=0){expensesItem[i].addEventListener('input', (event) => {
        if ( event.data!=null && event.data.charCodeAt(0)>=48 && event.data.charCodeAt(0)<=57){}
        else{event.srcElement.value = event.srcElement.value.substr(0,event.srcElement.value.length-1)};        
    })};
};
for (let i=0 ;  i < optionalexpensesItem.length; i++) {
    optionalexpensesItem[i].addEventListener('input', (event) => {
        if (event.data!=null && event.data.charCodeAt(0)>=1040 && event.data.charCodeAt(0)<=1103){}
        else{event.srcElement.value = event.srcElement.value.substr(0,event.srcElement.value.length-1)};
    });
};
