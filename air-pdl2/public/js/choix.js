var passageRural = false;
var passageVille = false;
var passageTraffic = false;

$('#rural').on('click',
    function () {
        passageRural = true;
        $('#carousel-example-generic').carousel(3);
    });

$('#ville').on('click',
    function () {
        passageVille = true;
        $('#carousel-example-generic').carousel(4);
    });

$('#trafic').on('click',
    function () {
        passageTraffic = true;
        $('#carousel-example-generic').carousel(5);
    });

$('.button').on('click',
    function () {
        $('#carousel-example-generic').carousel(2);
    });

$('.svga1Button').on('click',
    function () {
        if($('div.active').index() === 3){
            passageRural = true;
            if(passageVille && passageTraffic){
                $('#carousel-example-generic').carousel(6);
            }
            else{
                $('#carousel-example-generic').carousel(4);
            }
        }

        if($('div.active').index() === 4){
            passageVille = true;
            if(passageTraffic && passageRural){
                $('#carousel-example-generic').carousel(6);
            }
            else {
                $('#carousel-example-generic').carousel(5);
            }
        }

        if($('div.active').index() === 5){
            passageTraffic = true;
            if(!passageRural){
                $('#carousel-example-generic').carousel(3);
            }
            else{
                $('#carousel-example-generic').carousel(6);
            }
        }
    });
