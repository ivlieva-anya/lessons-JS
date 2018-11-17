"use strict";
let num = 33721;
let multiplication = 1;
num.toString().split('').forEach((item) => multiplication *= item);
console.log(multiplication);
document.write((multiplication ** 3).toString().slice(0, 2));