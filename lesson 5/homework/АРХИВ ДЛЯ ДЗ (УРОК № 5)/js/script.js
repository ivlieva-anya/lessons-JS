let menuTop= document.getElementsByClassName('menu'),
menuItem = document.getElementsByClassName('menu-item');
menuTop[0].insertBefore(menuItem [2], menuItem [1]);
let fiveItem = document.createElement('li');
fiveItem.classList.add('menu-item');
fiveItem.innerHTML='Пятый пункт';
menuTop[0].appendChild(fiveItem);
document.body.style.backgroundImage = 'url(img/apple_true.jpg)';
let title= document.getElementById('title').innerHTML= 'Мы продаем только подлинную технику Apple';
let a =document.getElementsByClassName('adv');
document.getElementsByClassName('column')[1].removeChild(a[0]);
let question = prompt ('Какое у вас отношение к технике apple: ','');
document.getElementById('prompt').innerText=question;