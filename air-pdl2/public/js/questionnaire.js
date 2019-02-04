$(function() {

    //Rural
    $('#info-i-ru').hide();
    $('#7-8-r').hide();
    $('#17-r').hide();
    $('#autres-r-jour').hide();
    $('#autres-r-nuit').hide();

    //Urbain
    $('#info-i-ur').hide();
    $('#0-4-ur').hide();
    $('#5-6-ur').hide();
    $('#7-8-ur').hide();
    $('#9-10-11-ur').hide();
    $('#12-14-ur').hide();
    $('#15-16-ur').hide();
    $('#17-18-ur').hide();
    $('#19-23-ur').hide();

    //Trafic
    $('#info-i-tr').hide();
    $('#0-1-2-3-tr').hide();
    $('#4-7-tr').hide();
    $('#8-tr').hide();
    $('#9-12-tr').hide();
    $('#13-16-tr').hide();
    $('#17-18-tr').hide();
    $('#19-23-tr').hide();


    $('#svg-container').hide();
    $('#voiture-gif').hide();
    $('#nuage').hide();
    $('.fond').hide();
    $('#next').hide();
    $('#nextArrow2').hide();
    $('#perso2').hide();
    $('#perso3').hide();

    $('.questions').hide();
    $('.reponses').hide();
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
            $('#remarque1-q2').hide();
            $('.nextQ').show();
        },
    );

    $('#electricite').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('#r1-q2').hide();
            $('.nextQ').show();
        },
    );

    $('#vehicules').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('#r1-q2').hide();
            $('.nextQ').show();
        },
    );

    $('#les-trois').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('#r2-q2').hide();
            $('.nextQ').show();
        },
    );

    $('#sante').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('#r1-q3').hide();
            $('.nextQ').show();
        },
    );

    $('#environnement').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('#r1-q3').hide();
            $('.nextQ').show();
        },
    );

    $('#les-deux').on('click',
        function() {
            $('.boutons').hide();
            $('.reponses').show();
            $('#r2-q3').hide();
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
                $('#perso').hide();
                $('#perso3').hide();
                $('#carousel-example-generic').carousel('next');
            }

            $(this).hide();
            $('.reponses').hide();
            $('.boutons').show();
        });

    $('#next').on('click',
        function () {
            $('#carousel-example-generic').carousel('next');
        });
});