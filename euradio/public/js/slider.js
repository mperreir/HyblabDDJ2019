var valeurRadio;
var valeurMusique;
var hasChanged = false;
var radios = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed','Al', 'eiusmod','Euradio', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua','Ut','Coucou','On','Continu','jusqu'];
var x = document.getElementById("musique");
x.load();
x.play();

$('#draggable').draggable({
  axis: "x",
  grid: [ 27, 10 ],
  drag: function( event, ui ) {
    var offset = $(this).offset(); // Avoir les coordonnées du slider
    var xPos = offset.left; //
    changer_radio(xPos);
  },
  containment: "parent"
});

function changer_radio(xPos){
  var position = xPos;
  var valeur = parseInt(((parseInt(xPos) - 547)/27))+7; //Valeur réelle
  $( ".imagesPage1 p" ).text(radios[valeur]);
  console.log((valeur));
  if(!hasChanged){
    valeurRadio = valeur%10+1;
    valeurMusique = valeur%3+1;
    document.getElementById('imgBackground').src="img/RadioFm/Radiofm_fréquence_"+valeurRadio+".png";
    document.getElementById('musique').src="Musiques/hyblablfm_"+valeurMusique+".wav";
    //document.getElementById('musique').load();
    x.load();
    x.play();
  }else{
    valeurRadio = valeur%7+1;
    valeurMusique = valeur%3+1;
    document.getElementById('imgBackground').src="img/RadioRnt/Radiornt_img_"+valeurRadio+".png";
    document.getElementById('musique').src="Musiques/hyblablfm_"+valeurMusique+".wav";
    x.load();
    x.play();
  }

  if( !hasChanged &&valeur >18){
    hasChanged =true;
    //document.getElementById('imgBackground').src="img/rntradioRNT.png";

    //document.getElementById('conteneurRadio').style.width= "40%";
    //document.getElementById('conteneurRadio').style.marginTop= "6%";
    //document.getElementById('conteneurRadio').style.marginBottom= "5%";

    $('#titre11').text("…La radio numérique terrestre");
    $('#titre12').text("aussi appelé DAB+");
    document.getElementById('sliderBackground').style.display="none";
    document.getElementById('sliderBackground2').style.display="inline-block";
    //document.getElementById('imgBackground').marginRight="5px";
    $('#conteneurLigne').append('<p class="phraseTransition">Et pour vous, ça change quoi ?</p>')


    //document.getElementById('nomRadio').style.top="65%";
    //document.getElementById('nomRadio').style.left="50%";
  }
}
