" use strict ";
let str = 'урок-3-был слишком легким';
let str1 = str.charAt(0).toUpperCase()+str.slice(1);
let str2 ='';
str1.split('-').forEach(str => str2=str2+ str+' ');
console.log(str2) ;

let arr = str2.split(' ');
let str3 = arr[arr.length-2];
console.log(str3.substr(0,str3.length-2)+'оо');

let arr1 = [20, 33, 1, 'Человек', 2, 3];
let summ = 0 ;
arr1.forEach(item => {
    if (typeof(item) === "number" ){
        summ += item ** 3;
    }
});
console.log(summ ** 0.5);

function f1(arg1){
    if (typeof(arg1) != "string") {
        alert ("Аргументом не является строкой!");
        return;
    }
    let str = arg1.trim();
    if (str.length>50) str = str.substr(0,50)+'...'
    return str;
};