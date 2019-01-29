

var animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

var currentIndex = $('div.active').index() + 1;
$('#carousel-example-generic').on('slid.bs.carousel', function() {
    currentIndex = $('div.active').index() + 1;

    if(currentIndex===1) {
        $('#perso').removeClass('translate');
        $('#voiture').removeClass('animated bounce bounceOutRight');
        $('#nuage').removeClass('fadein');
    }

    if(currentIndex===2) {
        $('#perso').toggleClass('translate').one(animationend,
            function(){
            $('#voiture').addClass('animated bounce').one(animationend,
                function(){
                    $(this).addClass('animated bounceOutRight');
                    $('#nuage').addClass('animated zoomIn').one(animationend,
                        function(){
                            $(this).removeClass('animated zoomIn');
                            $(this).addClass('fadein');
                        });
                });
        });
    }

    if(currentIndex===3) {
        $('#nuage').addClass('translate2');
    }
});

$('#carousel-example-generic').bind('wheel', function(e){
    if(e.originalEvent.wheelDelta > 0) {
        $(this).carousel('next');
    }
    else{
        $(this).carousel('prev');
    }

    if(currentIndex===1){
        $('#cache1').addClass('animated slideOutUp').one(animationend,
            function(){
                $(this).removeClass('animated slideOutUp');
            });
        $('#cache2').addClass('animated slideOutLeft').one(animationend,
            function(){
                $(this).removeClass('animated slideOutLeft');
            });
    }

    if(currentIndex===2){
        $('#nuage').removeClass('fadein');
    }

});