'use strict';

// No need for window.onload event here since we are using the def attribute
// when loading our scripts
var indice = 0;

function cacherPlusieurs(list){
  list.forEach(hide);
}

function cacher(element){
  var a = document.getElementById(element);
  a.style.visibility = 'hidden';
}

function playVideo2() {
  var video1 = document.getElementById("video1");
  var video2 = document.getElementById("video2");
  if (video1.currentTime >= 0){ // ** ATTENTION ** remettre >= 12 ici
    video1.pause();
    video1.style.visibility = "hidden";
    video2.style.visibility = "visible";
    video2.play();
  }

}
// affiche les fleches si elles sont cachées
// cache les fleches si elles sont affichées
function showArrows() {
  var down = document.getElementById("up");
  var down = document.getElementById("down");

  if(up.style.visibility == "visible"){
    up.style.visibility = "hidden";
    down.style.visibility = "hidden";
  } else{
  up.style.visibility = "visible";
  down.style.visibility = "visible";
  }
}



function video2Ended() {
  showArrows();
}

function goUp() {
  if (indice >=1){indice -= 1;}
  steps();
}
function goDown() {
  if (indice <=100){indice += 1} //ici, remplacer 100 par le nombre d'etape final
  steps();
}

function steps(){
  switch (indice) {
    case (0):
      showArrows();
      cacher('video2');
      video1 = document.getElementById("video1");
      video1.style.visibility = 'visible';
      video1.currentTime = 0;
      video1.play();
      break;
      case (1):
        cacher('video2');
        break;
    default:
  }
}
