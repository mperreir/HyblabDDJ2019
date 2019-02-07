function clignote(){
  var clignote = document.getElementById("clignote");
  clignote.style.visibility = "visible";
  clignote.currentTime=0;
  clignote.play();
  console.log("clignote");
}

function montrerInfo(id){
  var afficher = document.getElementById("info_"+id);
  afficher.style.visibility="visible";
  console.log("ID : ", id);
}
function valider_curseur(){
  console.log('leeeelo');
  $('#curseurCampagne').prop("disabled",true);
  $('#curseurCampagne').val(16).change();
  $('#curseurCampagne').rangeslider('update');
  var legende = document.getElementById('reponse_ville');
  legende.style.visibility = 'visible';
}
function dessinerParticule(canvas, nombre){
  var canvas = document.getElementById(canvas);
  var contexte = canvas.getContext('2d');

  contexte.clearRect(0, 0, canvas.width, canvas.height);

  contexte.strokeStyle = '#FFFFFF';
  contexte.fillStyle = '#FFFFFF';
  var x;
  var y;
  console.log("dessiner Particule",canvas,nombre);

  //faire une boucle sur le nombre de particule voulues
  for(var i = 0; i<50*nombre; i++){
    x = Math.floor((Math.random() * 400) + 1);
    y = Math.floor((Math.random() * 200) + 1);
    contexte.fillRect(x,y,1,1);

  }
  //Réalisation du tracé entre nos deux points
  contexte.stroke();
}

function clickVideo2(){
  var video2 = document.getElementById("video2");
  //console.log("click video 2, time : ",video2.currentTime);
  //var clignote = document.getElementById('clignote');

  if(video2.currentTime > 0){
    var video3 = document.getElementById("video3");
    console.log("fin video 2 : ", video2.currentTime);
    video2.currentTime = 0;
    video2.style.visibility = "hidden";
    //clignote.style.visibility = "hidden";
    video3.style.visibility = "visible";
    video3.play();}
}

function showButton(show) {
    var down = document.getElementById("up");
    var up = document.getElementById("down");

    if(show){
      console.log("show");
      up.style.visibility = "visible";
      down.style.visibility = "visible";
    } else{
      console.log("hide");
      up.style.visibility = "hidden";
      down.style.visibility = "hidden";
    }
  }

  function showAnswer(val){
    var dq = document.getElementById("dq"+val+"");
    dq.style.visibility="visible";
    var tq = document.getElementById("tq"+val+"");
    tq.style.visibility="visible";
    $("#q"+val+"").toggle(2000);
    setInterval(function(){changePic(val)},2000)
    $("#q"+val+"").toggle(2000);
  }
  function changePic(val){
    var q = document.getElementById("q"+val+"");
    q.src="img/q"+val+".svg";
  }

function mouvementCurseur(p,v){
  console.log("Position : ", p, " Value : ",v);
}

/*****************************************************************************
 * Fonction principale
 * @returns
 *****************************************************************************/
  $(function(){

    // Configuration du swiper
      var swiper = new Swiper('.swiper-container', {

            direction:'vertical',
            mouse: {
              enabled:false,
            },
            mousewheel: {
              invert: false,
            },
            keyboard: {
              enabled: true,
            },
            pagination: {
              el: '.swiper-pagination',
              type: 'fraction',
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',

            },

            on: {
                slideNextTransitionEnd: function () {
                      console.log("Next Slide : ", swiper.activeIndex);
                      switch (swiper.activeIndex) {
                        case 1:
                          console.log("Case 1");
                          //Lancement de la video
                          var video2 = document.getElementById("video2");
                          video2.play();
                          break;
                        case 2:
                          console.log("Case ", swiper.activeIndex, " showButton");
                          showButton(true);
                          break;
                        default:
                      }
                },
              }

          });


    // Déclaration du range slider
    $('#curseurVille').rangeslider({
        polyfill: false,

        onInit: function(){
          dessinerParticule('canvasVille',18);
        },
        // Callback function
        onSlide: function(position, value) {
             console.log('on bouge');
             dessinerParticule('canvasVille',value);
        },
        // Callback function
        onSlideEnd: function(position,value){
        },
    });
    $('#curseurCampagne').rangeslider({
        polyfill: false,

        onInit: function(){
          $('#concentrationCampagne').html('0 µmol/m3');
        },
        // Callback function
        onSlide: function(position, value) {
          console.log('position : ', position);
          $('#concentrationCampagne').html(value + ' µmol/m3');
          dessinerParticule('canvasCampagne',value);
        },
        // Callback function
        onSlideEnd: function(position,value){

        },
    });
    $('#curseurGrandeVille').rangeslider({
        polyfill: false,

        onInit: function(){
          dessinerParticule('canvasGrandeVille',18);
        },
        // Callback function
        onSlide: function(position, value) {
             console.log('on bouge');
             dessinerParticule('canvasGrandeVille',value);
        },
        // Callback function
        onSlideEnd: function(position,value){
        },
    });
    $('#curseurVille').prop("disabled",true);
    $('#curseurVille').rangeslider('update');
    $('#curseurGrandeVille').prop("disabled",true);
    $('#curseurGrandeVille').rangeslider('update');

  });
