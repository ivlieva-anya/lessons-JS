

//Calc
export function calc() {


    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        personsAll = document.querySelectorAll('.counter-block-input'),
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personSum = 0,
        daySum = 0,
        total = 0;
    totalValue.innerHTML = 0;

    function mm() {
        personsAll.forEach((pers) => {
            pers.addEventListener('input', function (e) {
                console.log(pers.value);
                let num = '123456789';
                if (num.indexOf(e.data, 0) < 0) {
                    pers.value = pers.value.substr(0, pers.value.length - 1);
                }
            });
        });
    }
    mm();

    persons.addEventListener('change', function () {

        personSum = +this.value;
        total = daySum * personSum * 4000;
        if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function (e) {
        console.dir(e.currentTarget.value);
        daySum = +this.value;
        total = daySum * personSum * 4000;
        if (persons.value == '' && this.value != '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });


    place.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
}
