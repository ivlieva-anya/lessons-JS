" use strict ";
let week = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
let date = new Date();
week.forEach((day,i) =>{
    let dayOfWeek = date.getDay();
    if (dayOfWeek===0) dayOfWeek = 7;
    dayOfWeek--;
    if (i<5 && i != dayOfWeek) {
        document.write(day+"</br>");}
    else if (i>5 && i===dayOfWeek){
        document.write("<i><b>"+day+"</b></i>"+"</br>");
    }
    else if (i<5){
        document.write("<i>"+day+"</i>"+"</br>");
    }
    else {document.write("<b>"+day+"</b>"+"</br>");}
});
let arr = ['33456','7444','322','564','327','123','4329'];
arr.forEach(item=>{
    if (item.charAt(0)==='3' || item.charAt(0)==='7') console.log(item);
});