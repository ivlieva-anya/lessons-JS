' use strict ';
let money = prompt('Ваш бюджет на месяц?');
let time = prompt('Введите дату в формате YYYY-MM-DD');
let answ1 = prompt('Введите обязательную статью расходов в этом месяце');
let answ2 = +prompt('Во сколько обойдется?');
let answ3 = prompt('Введите обязательную статью расходов в этом месяце');
let answ4 = +prompt('Во сколько обойдется?');
let appData = {
    budget: money,
    timeData: time,
    expenses: {[answ1]:answ2, [answ3]:answ4},
    optionalExpenses: {},
    income: [],
    savings: false
};
appData.expenses[answ1] = answ2;
appData.expenses[answ3] = answ4;
alert( appData.budget / 30);
console.log (appData);