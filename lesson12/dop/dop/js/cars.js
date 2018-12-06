window.addEventListener('DOMContentLoaded', function () {

    function drawCar() {
        let divCar = document.createElement('div');
        divCar.classList.add('car');
        divCar.innerHTML = `
            <h2>${this.name}</h2> 
            <div class="carImg">
                <img src="${this.img}" alt="foto ${this.name}" >
            </div>
            <div class="description">
            ${this.description}
            </div>
            <div class="price">Цена: <span>${this.price}</span></div>
            <div class="country"> Страна производства : <span>${this.category}</span></div>
        `;
        return divCar;
    }
    
    function drawSelector(domelem){
        if( ee.some(item => item === this.category) === false){
            let lab = document.createElement('label');
                lab.setAttribute('for',this.category);
                lab.innerText =  this.category[0].toUpperCase() + this.category.substring(1);
            let inp = document.createElement('input');
                inp.setAttribute('id',this.category);
                inp.setAttribute('name','country');
                inp.setAttribute('type','checkbox');
                inp.setAttribute('checked','');
            let d = document.createElement('div');
            d.appendChild(inp);
            d.appendChild(lab);
            domelem.appendChild(d);
            inp.addEventListener('click', ({target}) => {
                let text = target.labels[0].innerText.toLowerCase();
                if (target.checked) {
                    nodeList.filter(ii => ii.querySelector('.country span').innerText === text).forEach(iii => iii.classList.remove('hidden'));
                } else {
                    nodeList.filter(ii => ii.querySelector('.country span').innerText === text).forEach(iii => iii.classList.add('hidden'));
                }
            });
    
            ee.push(this.category);
        }
    }

    const shopWindow = document.querySelector('.shopWindow'),
        checkBox = document.querySelectorAll('input');
        checklist = document.querySelector('.filter')
    let request = new XMLHttpRequest(),
        nodeList = [],
        ee = [];

    request.open('GET', 'cars.json');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status == 200) {
            JSON.parse(request.response).cars.forEach(element => {
                let showNode = drawCar.call(element);
                shopWindow.appendChild(showNode);
                nodeList.push(showNode);
                drawSelector.apply(element,[checklist])
            });
        };
    });
});