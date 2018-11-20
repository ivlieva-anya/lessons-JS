' use strict ';
let money, time;
let appData = {
    budget: 0,
    timeData: 0,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function () {
        for (let i = 0; i < 2; i++) {
            let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
                b = +prompt('Во сколько обойдется?', '');
            if ((typeof (a)) != null && (typeof (b)) != null && !(isNaN(b)) &&
                a != '' && b != '' && a.length < 50) {
                console.log("done");
                appData.expenses[a] = b;
            } else {
                alert("Произошла ошибка Введите заново");
                --i;
            }
        }
    },
    detectDayBudget: function () {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert("Ежедневный бюджет: " + appData.moneyPerDay);
    },
    detectLevel: function () {
        if (appData.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if (appData.moneyPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay > 2000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log("Произошла ошибка");
        }
    },
    checkSaving: function () {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?"),
                persent = +prompt("Под какой процент?");
            appData.monthIncome = save / 100 / 12 * persent;
            alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },
    chooseOptExpenses: function () {
        for (let i = 1; i < 4; i++) {
            let a = prompt('Статья необязательных расходов?', '');
            appData.optionalExpenses[i] = a;
        }
    },
    chooseIncome: function () {
        for (let i = 0; i < 1; i++) {
            let items = prompt('Что принесет доп. доход? (Перечислите через запятую)', '');
            if ((typeof (items)) === 'string' && items != null && items != "") {
                appData.income = items.split(',');
                appData.income.push(prompt('Что-то еще?'));
                appData.income.sort();
            } else {
                alert("Произошла ошибка");
                --i;
            }
        }
        appData.income.forEach((item,i)=>{
            alert((i+1)+" cпособ доп. заработка: "+ item);
        });
    },
};
function start() {
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    appData.budget = money;
    appData.timeData = time;
};
start();
for (let key in appData){
    console.log('Наша программа включает в себя данные: '+ key);
}