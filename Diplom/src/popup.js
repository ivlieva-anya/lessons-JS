import {clearAllCalc} from './calcdata';
export function setCloseAroundPopup(elem, elemClosed) {
    elem.addEventListener('click', function ({target}) {
        if (!elemClosed.contains(target)) {
            this.style = "display : none";
            document.body.style.overflow='auto';
        }
    });
};
export function setOpenPopup(elem, elemOpened) {
    elem.addEventListener('click', (event) => {
        elemOpened.style.display = "flex";
        document.body.style.overflow='hidden';
        event.preventDefault();
    });
};

export function setClosePopup(elem, elemClosed) {
    elem.addEventListener('click', function ({target}) {
        if(this.classList.contains('calc_form')){
            clearAllCalc (); 
        } 

        elemClosed.style = "display : none";
        document.body.style.overflow='auto';
    });
};

export function Popup() {
    const popupEngineerBtn = document.querySelector('.popup_engineer_btn'),
    popupEngineer = document.querySelector('.popup_engineer'),
    phoneLink = document.querySelectorAll('.phone_link'),
    contactUsWrap = document.querySelector('.contact_us_wrap'),
    popup = document.querySelector('.popup'),
    form = document.querySelectorAll('.dontclose'),
    popupClose = document.querySelectorAll('.popup_close');

//popup 

setTimeout(()=>{
    popup.style.display = 'flex';
},60000)


setOpenPopup(popupEngineerBtn, popupEngineer);
phoneLink.forEach(item=>{
    setOpenPopup(item, popup);
});
setOpenPopup(contactUsWrap, popup);

setCloseAroundPopup(popupEngineer, form[1]);
setCloseAroundPopup(popup, form[0]);

popupClose.forEach((item) => {
    setClosePopup(item, popupEngineer)
});

}