
var animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

var currentIndex = $('div.active').index() + 1;

$('#carousel-example-generic').on('slid.bs.carousel', function() {
    currentIndex = $('div.active').index() + 1;

    if(currentIndex===1) {
        $('#next').hide();
        $('#svg-container').hide();
    }

    if(currentIndex===2) {
        $('#svg-container').hide();
        $('#voiture').hide();
        $('#nuage').show();
        $('#nuage').addClass('translateNO2');
        $('#perso').hide();
        $('#perso3').show();
        $('#perso3').attr("src", $("#perso4").attr("src"));
        $('#perso3').addClass('translate3');
        setTimeout(function () {
            $('.fond').show();
            $('.fond').addClass('animated slideInRight');
        },4000); //4000

        setTimeout(function () {
            $('.questions').show();
            $('#q1').show();
            $('.questions').addClass('animated fadeIn');
        },5000); //5000

        setTimeout(function () {
            $('.reponses').show();
            $('#r1').show();
            $('.reponses').addClass('animated fadeIn');
        },7000); //7000

        setTimeout(function () {
            $('.nextQ').show();
            $('.nextQ').addClass('animated fadeIn');
        },7000); //7000

        $('.boutons').addClass('animated fadeIn');
    }

    if(currentIndex===3){
        $('#nuage').hide();
        $('#voiture').hide();
        $('#svg-container').hide();
        $('#carousel-example-generic').addClass('carousel-fade');
    }

    if(currentIndex===4){
        $('#svg-container').show();
        $('#nextArrow2').show();
    }

    if(currentIndex===5){
        $('#svg-container').show();
        $('#nextArrow2').show();
    }

    if(currentIndex===6){
        $('#svg-container').show();
        $('#nextArrow2').show();
    }

    if(currentIndex===7){
        $('#svg-container').hide();
    }

    if(currentIndex===8){
        $('#svg-container').hide();
        $('#carousel-example-generic').removeClass('carousel-fade');
    }

    if(currentIndex===9){
        $('#svg-container').hide();
    }

});


$('#image-parti').on('click', function () {
        $('#perso').addClass('translate');
        $(this).addClass('animated rotateOut');
        setTimeout(function(){
            $('#cache1').addClass('animated slideOutUp');
            $('#cache2').addClass('animated slideOutLeft');
            $('#envie').addClass('animated fadeOutLeftBig');
            $('#experience').addClass('animated fadeOutLeftBig');
            $('#parti').addClass('animated fadeOutLeftBig');
            $('#logo').addClass('animated fadeOutLeftBig');

        },800);

    setTimeout(function (){
        $('#perso').attr("src", $("#perso2").attr("src"));
    },0);

    setTimeout(function(){
        $('#voiture').hide();
        $('#voiture-gif').show();
        $('#voiture-gif').attr("src", $("#voiture-gif").attr("src"));
    },2000);

    setTimeout(function(){
        $('#voiture-gif').toggleClass('translate2d');
    },6000);

    setTimeout(function(){
        $('#perso').attr("src", $("#perso3").attr("src"));
        $('#perso').addClass('translate2');
    },9000);

    setTimeout(function(){
        $('#next').show();
        $('#next').addClass('animated bounce infinite');
    },10500);
});

var afficher = function(id){
    $(id).show();
}

var cacher = function(id){
    $(id).hide();
}
