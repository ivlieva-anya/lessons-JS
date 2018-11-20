function sumdel(number) {
    let sum = 0;
    for (let i = 1; i < number; i++) {
        if (number % i === 0) sum += i;
    }
    return sum;
}

function getFriendlyNumbers(start, end) {
    if (typeof (start) != "number" && typeof (end) != "number" && start < 0 && end < 0 && start > end && !isInteger(start) && !isInteger(end)) return false;
    let result = [];
    for (let i = start; i < end; i++) {
        let ddd = sumdel(i);
        if (ddd != 0 && i < ddd && i != ddd && i === sumdel(ddd)) {
            result.push([i, ddd]);
        }
    };
    return result;
}
console.log(getFriendlyNumbers(1, 10000));