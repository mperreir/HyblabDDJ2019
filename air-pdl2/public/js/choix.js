

$('#rural').on('click',
    function () {
        $('#carousel-example-generic').carousel(3);
    });

$('#ville').on('click',
    function () {
        $('#carousel-example-generic').carousel(4);
    });

$('#trafic').on('click',
    function () {
        $('#carousel-example-generic').carousel(5);
    });

$('.retour').on('click',
    function () {
        $('#carousel-example-generic').carousel(2);
    });

$('.nextArrow').on('click', function () {
    $('#carousel-example-generic').carousel('next');
});

$('#nextArrow2').on('click', function () {
    $('#carousel-example-generic').removeClass('carousel-fade');
    $('#carousel-example-generic').carousel(6);
});

$('.backArrow').on('click', function () {
    $('#carousel-example-generic').carousel('prev');
});

$('#backArrow2').on('click', function () {
    $('#carousel-example-generic').carousel(2);
});

$('#recommandations').on('click', function () {
    $('#carousel-example-generic').addClass('carousel-fade');
    $('#carousel-example-generic').carousel('next');
});

$('#retour-slide-2').on('click',function () {
    $('.fond').hide();
});