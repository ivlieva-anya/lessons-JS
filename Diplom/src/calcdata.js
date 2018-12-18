export let calcData = {
    globtype : 0,
    model : 1,
    width : 0,
    height :0,
    glazing : 0,
    type : 0,
    name : '',
    phone : '',
    clear : function (){
        this.model = 1;
        this.width = 0;
        this.height =0;
        this.glazing = 0;
        this.type = 0;
        this.name = '';
        this.phone = '';
    }
}    
export function clearAllCalc (){
    calcData.clear();
    const allCalc = document.querySelectorAll('.popup_calc_content, .popup_calc_profile_content, .popup_calc_end .popup_content')
    allCalc.forEach(item=>{
        const input = item.querySelectorAll('input,select,div.balcon_icons');
        for (let i = 0; i < input.length; i++) {
            if (input[i].localName ==='input'){
                if (input[i].type ==='checkbox'){
                input[i].checked = false;
                } else {
                input[i].value = '';
                }
            } else if (input[i].localName ==='div'){
                const aCleare = input[i].querySelectorAll('img');
                aCleare.forEach(item=>{
                    item.classList.remove('do_image_more');
                });
                aCleare[0].classList.add('do_image_more');
            }else if (input[i].localName ==='select'){
            input[i].value = 'tree';
            }
       }
    });
}
