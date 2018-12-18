    import {calcData} from './calcdata';
    import {setClosePopup} from './popup';
    import {sendForm} from './form';
    

export function calck() {

    const popupCalcBtn = document.querySelectorAll('.popup_calc_btn'),
        popupCalc = document.querySelector('.popup_calc '),
        popupCalcClose = document.querySelector('.popup_calc_close'),
        onlyDigit = document.querySelectorAll('.only-digit'),
        popupCalcButton = document.querySelector('.popup_calc_button'),
        popupCalcProfile = document.querySelector('.popup_calc_profile'),
        checkbox = document.querySelectorAll('.checkbox'),
        popupCalcProfileClose = document.querySelector('.popup_calc_profile_close'),
        popupCalcProfileButton = document.querySelector('.popup_calc_profile_button'),
        popupCalcEnd = document.querySelector('.popup_calc_end '),
        popupCalcEndClose = document.querySelector('.popup_calc_end_close'),
        inputWigth = document.querySelector('#width'),
        inputHeight = document.querySelector('#height'),
        viewType = document.querySelector('#view_type'),
        userName = document.querySelector('#user_name'),
        userPhone = document.querySelector('#user_phone'),
        calcSubmit = document.querySelector('#calc-submit')

    setClosePopup(popupCalcClose, popupCalc);
    setClosePopup(popupCalcProfileClose, popupCalcProfile);
    setClosePopup(popupCalcEndClose, popupCalcEnd);

    popupCalcBtn.forEach(element => {
        element.addEventListener('click', (event) => {
            popupCalc.style.display = "flex";
            document.body.style.overflow='hidden';
            event.preventDefault();
        });
           
    });

    function onlydiget() {
        onlyDigit.forEach((pers) => {
            pers.addEventListener('input', function (e) {
                let num = '1234567890';
                if (num.indexOf(e.data, 0) < 0) {
                    pers.value = pers.value.substr(0, pers.value.length - 1);
                }
            });
        });
    }
    function setOpenClose(button,close,open,flag){
        button.addEventListener('click', function (event) {
            // const in1 = close.querySelectorAll('input')

            if (flag ===1){
                if(calcData.width*calcData.height != 0){
                    close.style = "display : none";
                    open.style = "display : flex";
                }
            }else if (flag ===2){
                if (calcData.type != 0){
                    close.style = "display : none";
                    open.style = "display : flex";
                }
            }
        });
    };

    setOpenClose(popupCalcButton,popupCalc,popupCalcProfile,1);
    setOpenClose(popupCalcProfileButton,popupCalcProfile,popupCalcEnd,2);

    checkbox.forEach((item) => {
        item.addEventListener('click', function ({target}) {
            let number = 0;
            checkbox.forEach((i) => {
                number++;
                if (i === target) {
                    i.checked = true;
                     calcData.type = number;
                    } else i.checked = false;
            })
        })
    })
    onlydiget();

    inputWigth.addEventListener('change',function(){
        calcData.width = this.value;
    })
    
    inputHeight.addEventListener('change',function(){
        calcData.height = this.value;
    })
    viewType.addEventListener('change',function(){
        calcData.glazing = this.value;
    })

    userName.addEventListener('change',function(){
        calcData.name = this.value;
    })

    userPhone.addEventListener('change',function(){
        calcData.phone = this.value;
    })

    sendForm(calcSubmit);
}