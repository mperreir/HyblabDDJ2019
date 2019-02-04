var valeurRadio;
var valeurMusique;
var hasChanged = false;
var xPosOrigin;
var radios = ["88.2 : Radio Scoop ","88.7 : France Bleu","89.3 : Alouette","89.4 : France Culture","89.5 : Latina","90.3 : Mona FM","90.5 : Cherie FM","91.4 : Virgin Radio","92.9 : Nostalgie","94.4 : France Inter","95,5 : M Radio","97.2 : Skyrock","97.6 : Métropolys","100 : Jazz Radio","100.8 : Vibration","100.9 : NRJ","102.3 : Sud Radio","102.9 : Voltage","103.5 : Rire et Chansons","104.1 : Hit West","104.5 : Radio Courtoisie","104.7 : Europe 1","105.3 : RTL","105.5 : France Info","106.4 : Fun Radio"];
var dab = ["Ado FM","Beur FM","Collector Radio","Denis FM ","Euradio","France Inter","Grenouille Radio ","Hyblab FM","Igloo","Jazz Radio ","Kiss FM","Latina","MFM Radio","Néo","Ouï FM","Paname","QI FM","Radio Soleil","Swigg","Tropiques FM","Uranus ","Virage","Wagon","X Trem Sport","Yolo Radio ","Zizou FM"
];
var x;

$('#draggable').draggable({
  axis: "x",
  grid: [ 31, 10 ],
  drag: function( event, ui ) {
    var offset = $(this).offset(); // Avoir les coordonnées du slider
    var xPos = offset.left; //
    x = document.getElementById("musique");
    x.load();
    x.play();
    document.getElementById("souffle").load();
    document.getElementById("souffle").play();
    document.getElementById("souffle").loop = true;
    changer_radio(xPos);
  },
  create: function(event,ui){
    xPosOrigin = $(this).offset().left;
  },
  containment: "parent"
});

function changer_radio(xPos){
  var position = xPos;



  if(!hasChanged){
    var valeur = parseInt(((xPos - xPosOrigin)/31))+9; //Valeur réelle
    $( "#nomRadio" ).text(radios[valeur]);
    console.log((valeur));
    valeurRadio = valeur%10+1;
    valeurMusique = valeur%16+1;
    document.getElementById('imgBackground').src="img/RadioFm/Radiofm_fréquence_"+valeurRadio+".png";
    x.pause();
    document.getElementById('musique').src="musiques/AUDIO HYBLAB/hyblablfm_"+valeurMusique+".wav";
    //document.getElementById('musique').load();
    x.load();
    x.play();
  }else{
    var valeur = parseInt(((xPos - xPosOrigin)/42))+3; //Valeur réelle
    console.log((valeur));
    $( "#nomRadio" ).text(dab[valeur]);
    valeurRadio = valeur%7+1;
    valeurMusique = valeur%16+1;
    x.pause();
    document.getElementById('imgBackground').src="img/RadioRnt/Radiornt_img_"+valeurRadio+".png";
    document.getElementById('musique').src="musiques/AUDIO HYBLAB/hyblablfm_"+valeurMusique+".wav";
    x.load();
    x.play();
  }

  if( !hasChanged &&valeur >17){
    hasChanged =true;
    document.getElementById("souffle").src = "";
    $( "#draggable" ).draggable({
      grid: [ 44, 20 ]
    });
    //document.getElementById('imgBackground').src="img/rntradioRNT.png";

    //document.getElementById('conteneurRadio').style.width= "40%";
    //document.getElementById('conteneurRadio').style.marginTop= "6%";
    //document.getElementById('conteneurRadio').style.marginBottom= "5%";

    $('#titre11').text("…La radio numérique terrestre");
    $('#titre12').text("aussi appelé DAB+");
    document.getElementById('sliderBackground').style.display="none";
    document.getElementById('sliderBackground2').style.display="inline-block";
    document.getElementById('partie').style.marginLeft="8%";
    document.getElementById('partie').style.width="107%";
    document.getElementById('draggable').style.width="5%";
    document.getElementById('partie').style.marginTop="1.7%";
    //document.getElementById('imgBackground').marginRight="5px";
    $('#conteneurLigne').append('<p class="phraseTransition">Et pour vous, ça change quoi ?</p>')
    var valeur = parseInt(((xPos - xPosOrigin)/42))+12; //Valeur réelle
    //console.log((valeur));
    $( "#nomRadio" ).text(dab[valeur]);
    valeurRadio = valeur%7+1;
    valeurMusique = valeur%5+1;
    document.getElementById('imgBackground').src="img/RadioRnt/Radiornt_img_"+valeurRadio+".png";
    x.pause();
    document.getElementById('musique').src="musiques/hyblablfm_"+valeurMusique+".wav";
    x.load();
    x.play();
    //document.getElementById('nomRadio').style.top="65%";
    //document.getElementById('nomRadio').style.left="50%";
  }
}
