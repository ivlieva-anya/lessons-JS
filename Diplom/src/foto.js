import {setCloseAroundPopup} from './popup';

export function foto(){

    const smalFoto = document.querySelectorAll('.works .container .row div'),
    popupFoto = document.querySelector('.popup-foto'),
    aFoto = document.querySelectorAll('.works .container .row div a'),
    modalImg = popupFoto.querySelector('img');

    aFoto.forEach(item=>{
    item.setAttribute('onclick','return false');
    })
    function showBigImg(event,item){
    item.addEventListener(event,({target})=>{
        popupFoto.style= "display : flex";
        let a =target.src.substr(target.src.indexOf('img/', 0)).split('/'),
            b= a.splice(2,0,'big_img');
        modalImg.setAttribute('src',a.join('/'))
        document.body.style.overflow='hidden';
    })
    }
    smalFoto.forEach(item=>{
    showBigImg('click',item);
    })
    setCloseAroundPopup(popupFoto, modalImg);
}