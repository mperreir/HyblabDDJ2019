$(function() {
    $('.svg-container').hide();
    $('#voiture-gif').hide();
    $('#nuage').hide();
    $('.fond').hide();
    $('#next').hide();
    $('#perso2').hide();
    $('#perso3').hide();
    $('.questions').hide();
    $('.reponses').hide();
    $('.remarques').hide();
    $('.nextQ').hide();
    $('#q2').hide();
    $('#q3').hide();
    $('#r2').hide();
    $('#r3').hide();


    $('#chauffage').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('#r1-q2').hide();
            $('.remarques').show();
            $('#remarque1-q2').hide();
            $('.nextQ').show();
        },
    );

    $('#electricite').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('#r1-q2').hide();
            $('.remarques').show();
            $('#remarque1-q2').hide();
            $('.nextQ').show();
        },
    );

    $('#vehicules').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('#r1-q2').hide();
            $('.remarques').show();
            $('#remarque1-q2').hide();
            $('.nextQ').show();
        },
    );

    $('#les-trois').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('#r2-q2').hide();
            $('.remarques').show();
            $('#remarque2-q2').hide();
            $('.nextQ').show();
        },
    );

    $('#sante').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('.remarques').show();
            $('#remarque1-q3').hide();
            $('.nextQ').show();
        },
    );

    $('#environnement').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('.remarques').show();
            $('#remarque1-q3').hide();
            $('.nextQ').show();
        },
    );

    $('#les-deux').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('.remarques').show();
            $('#remarque2-q3').hide();
            $('.nextQ').show();
        },
    );

    $('.nextQ').on('click',
        function () {
            if($('#q1').is(':visible')){
                $('#q1').hide();
                $('#q2').show();
            }

            else if($('#q2').is(':visible')){
                $('#q2').hide();
                $('#q3').show();
            }

            else{
                $('#q3').hide();
                $('#carousel-example-generic').carousel('next');
            }

            $(this).hide();
            $('.reponses').hide();
            $('.remarques').hide();
            $('.boutons').show();
        });

    $('#next').on('click',
        function () {
            $('#carousel-example-generic').carousel('next');
        });
});