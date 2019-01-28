$( () => {
    //Click on header section (fisrt dot) to scroll to the top
    $('#section0').on('click', () => {
    $('html,body').animate({
    scrollTop: 0
},500);
});

//scrolling
$('a[href*="#"]').on('click', function(e){
    $('html,body').animate({
        scrollTop:
        $($(this).attr('href')).offset().top
    },500);
    e.preventDefault();
});
});