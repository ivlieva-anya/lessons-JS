import {calcData} from './calcdata';
export function Tabs(){
    const info = document.querySelector('.slick-list'),
    tabContent = document.querySelectorAll('.glazing .container .row'),
    tab = document.querySelectorAll('.glazing_block '),
    balconIcons = document.querySelector('.balcon_icons'),
    bigImg = document.querySelectorAll('.big_img img'),
    imgTab = balconIcons.querySelectorAll('a img');

    let rez =0;
    function superTabs(info, tabContent, tab, classTab, show, slickCurrent) {
    
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove(show);
            tabContent[i].classList.add('hide');
            if (classTab === 'decoration_item'){
                tab[i].children[0].classList.remove(slickCurrent)
            } else {
                tab[i].classList.remove(slickCurrent);
            }
        }
    }
    hideTabContent(1);
    tab[0].classList.add(slickCurrent);
    
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add(show);
            if (classTab === 'decoration_item'){
                tab[b].children[0].classList.add(slickCurrent)
            } else {
                tab[b].classList.add(slickCurrent);
            }
        };
    };
    
    info.addEventListener('click', function (event) {
        event.preventDefault();
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].contains(event.target)) {
                hideTabContent(0);
                showTabContent(i);
                if (slickCurrent==='slick-current'){
                    calcData.globtype = tab[i].getAttribute('data-slick-index');
                }
                if (classTab === 'window'){
                    calcData.model = i;
                };
                break;
            };
        };
    });
    };
    superTabs(info, tabContent, tab, 'glazing_block', 'show', 'slick-current');
    superTabs(balconIcons, bigImg, imgTab, '', 'popup_calc_show', 'do_image_more');

    const slickTrack = document.querySelector('.decoration_slider'), //зона табов
    track = document.querySelectorAll('.decoration_content_item'), // коллекция табов
    trackItem = slickTrack.querySelectorAll('.decoration_item') // открывающиеся табы
    superTabs(slickTrack, track, trackItem, 'decoration_item', 'show','after_click');

}

