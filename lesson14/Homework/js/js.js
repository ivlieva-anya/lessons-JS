$(document).ready(function(){
    $('.main_btna,.main_btn,a:contains("расписания туров")').on('click',function(){
        $('.overlay').fadeToggle("slow");
        $('.modal').slideDown();
    });
    $('.close').on('click',()=>{
        $('.overlay').fadeToggle("slow");
        $('.modal').slideUp();
    });
});