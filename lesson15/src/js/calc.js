

//Calc
export function calc() {


    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        personsAll = document.querySelectorAll('.counter-block-input'),
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        calcmumbai = document.querySelector('#select'),
        personSum = 0,
        daySum = 0,
        total = 0;
    totalValue.innerHTML = 0;

    function mm() {
        personsAll.forEach((pers) => {
            pers.addEventListener('input', function (e) {
                let num = '1234567890';
                if (num.indexOf(e.data, 0) < 0) {
                    pers.value = pers.value.substr(0, pers.value.length - 1);
                }
            });
        });
    }
    mm();

    

    persons.addEventListener('change', function () {

        personSum = +this.value;
        total = daySum * personSum * 4000 * calcmumbai.options[calcmumbai.selectedIndex].value;

        if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function (e) {
        daySum = +this.value;
        total = daySum * personSum * 4000;
        if (persons.value == '' && this.value != '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
        totalValue.innerHTML = total * calcmumbai.options[calcmumbai.selectedIndex].value;
    });


    place.addEventListener('change', function calcMumbai() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
}
