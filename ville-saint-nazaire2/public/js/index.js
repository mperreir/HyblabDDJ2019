let slide=0;

let personnage="oooo";
let haveScroll = "faux";

$(document).ready(function() {

    //activate wow.js
     new WOW().init();

    //activate fullpage.js
    $('#fullpage').fullpage({
      scrollBar: true,
      navigation: true,
      navigationTooltips: [],
      loopBottom: true,
      sectionSelector: 'section'
    });

  //apply color to each section from array
  int = -1;
  color_array = ['#1abc9c','#c0392b','#9b59b6','#3498db','#f1c40f','#16a085'];

  $('section').each(function(){
    int++
    slide++

    //$(this).addClass('grid-item-' + int).css('background-color', color_array[int]);
  });

});

console.log(slide);
let step = 'step1';

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');
step1.classList.add("is-active");

//document.getElementById("bubble-text").innerHTML = "8h : J’installe mes sacoches sur mon porte bagage et j’enfourche mon vélo électrique pour me rendre au marché comme chaque mardi. J’aime y être assez tôt pour avoir le choix et les produits les plus frais possible. ";
document.getElementById("etape1").style.display = 'block';
document.getElementById("etape2").style.display = 'none';
document.getElementById("etape3").style.display = 'none';
document.getElementById("etape4").style.display = 'none';

function next() {

  if (step === 'step1') {
    console.log("step1");
    document.getElementById("etape1").style.display = 'none';
    document.getElementById("etape2").style.display = 'block';
    document.getElementById("etape3").style.display = 'none';
    document.getElementById("etape4").style.display = 'none';
    step1.classList.add("is-active");
    step = 'step2';
    //step1.classList.remove("is-active");
    step1.classList.add("is-complete");
    document.getElementById("step1").style.opacity=0.5;
    step2.classList.add("is-active");
    document.getElementById("imgGraph").src="imgJeux/barchartE2.png";
    document.getElementById("bikeMoove").style.transform = "translate(340px, 0px)";
    document.getElementById("bikeMoove").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove").style.zIndex = "9999";
    //document.getElementById("bubble-text").innerHTML = "8h04 : Sur le trajet, je m'arrête à la banque pour retirer quelques billets.";

  } else if (step === 'step2') {
    console.log("step2");
    document.getElementById("etape1").style.display = 'none';
    document.getElementById("etape2").style.display = 'none';
    document.getElementById("etape3").style.display = 'block';
    document.getElementById("etape4").style.display = 'none';
    step = 'step3';
    document.getElementById("step2").style.opacity=0.5;
    //step2.classList.remove("is-active");
    step2.classList.add("is-complete");
    step3.classList.add("is-active");
    document.getElementById("imgGraph").src="imgJeux/barchartE3.png";
    document.getElementById("bikeMoove").style.transform = "translate(680px, 0px)";
    document.getElementById("bikeMoove").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove").style.zIndex = "9999";
    //document.getElementById("bubble-text").innerHTML = "8h10 : J’arrive à l’abri-vélo à côté du marché. Super ! Je ne payerai pas le stationnement. Il ne faut pas que j’oublie de passer au stand du boucher.";
  } else if (step === 'step3') {
    console.log("step3");
    document.getElementById("etape1").style.display = 'none';
    document.getElementById("etape2").style.display = 'none';
    document.getElementById("etape3").style.display = 'none';
    document.getElementById("etape4").style.display = 'block';
    step = 'step4';
    document.getElementById("step3").style.opacity=0.5;
    //step3.classList.remove("is-active");
    step3.classList.add("is-complete");
    step4.classList.add("is-active");
    document.getElementById("imgGraph").src="imgJeux/barchartE4.png";
    document.getElementById("bikeMoove").style.transform = "translate(1005px, 0px)";
    document.getElementById("bikeMoove").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove").style.zIndex = "9999";
    //document.getElementById("bubble-text").innerHTML = "9h10 : Après 1h de courses, je fais un petit détour par le fleuriste pour acheter un nouveau rosier et je rentre à la maison. Il est temps de se mettre en cuisine !";
  } else if (step === 'step4') {
    console.log("step4");
    step = 'complete';
    document.getElementById("step4").style.opacity=0.5;
    //step4.classList.remove("is-active");
    step4.classList.add("is-complete");
    document.getElementById("imgGraph").src="imgJeux/barchartE1.png";
    document.getElementById("bikeMoove").style.transform = "translate(1005px, 0px)";
    document.getElementById("bikeMoove").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove").style.zIndex = "9999";
  } else if (step === 'complete') {
    step = 'step1';
    document.getElementById("etape1").style.display = 'block';
    document.getElementById("etape2").style.display = 'none';
    document.getElementById("etape3").style.display = 'none';
    document.getElementById("etape4").style.display = 'none';
    document.getElementById("step1").style.opacity=1;
    document.getElementById("step2").style.opacity=1;
    document.getElementById("step3").style.opacity=1;
    document.getElementById("step4").style.opacity=1;
    step4.classList.remove("is-active");
    step3.classList.remove("is-active");
    step2.classList.remove("is-active");
    step1.classList.remove("is-active");
    step4.classList.remove("is-complete");
    step3.classList.remove("is-complete");
    step2.classList.remove("is-complete");
    step1.classList.remove("is-complete");
    document.getElementById("bikeMoove").style.transform = "translate(0px, 0px)";
    document.getElementById("bikeMoove").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove").style.zIndex = "9999";
    step1.classList.add("is-active");
    //document.getElementById("bubble-text").innerHTML = "8h : J’installe mes sacoches sur mon porte bagage et j’enfourche mon vélo électrique pour me rendre au marché comme chaque mardi. J’aime y être assez tôt pour avoir le choix et les produits les plus frais possible. ";
  }
}


document.getElementById("etape1J").style.display = 'block';
document.getElementById("etape2J").style.display = 'none';
document.getElementById("etape3J").style.display = 'none';
document.getElementById("etape4J").style.display = 'none';
let stepJ = 'step1';
step1J.classList.add("is-active");

function nextJ(){
  if (stepJ === 'step1') {
    console.log("step1");
    document.getElementById("etape1J").style.display = 'none';
    document.getElementById("etape2J").style.display = 'block';
    document.getElementById("etape3J").style.display = 'none';
    document.getElementById("etape4J").style.display = 'none';
    step1J.classList.add("is-active");
    stepJ = 'step2';
    //step1.classList.remove("is-active");
    step1J.classList.add("is-complete");
    document.getElementById("step1J").style.opacity=0.5;
    step2J.classList.add("is-active");
    document.getElementById("imgGraph2").src="imgJeux/jbarchartE2.png";
    document.getElementById("bikeMoove2").style.transform = "translate(340px, 0px)";
    document.getElementById("bikeMoove2").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove2").style.zIndex = "9999";
    //document.getElementById("bubble-text").innerHTML = "8h04 : Sur le trajet, je m'arrête à la banque pour retirer quelques billets.";

  } else if (stepJ === 'step2') {
    console.log("step2");
    document.getElementById("etape1J").style.display = 'none';
    document.getElementById("etape2J").style.display = 'none';
    document.getElementById("etape3J").style.display = 'block';
    document.getElementById("etape4J").style.display = 'none';
    stepJ = 'step3';
    document.getElementById("step2J").style.opacity=0.5;
    //step2.classList.remove("is-active");
    step2J.classList.add("is-complete");
    step3J.classList.add("is-active");
    document.getElementById("imgGraph2").src="imgJeux/jbarchartE3.png";
    document.getElementById("bikeMoove2").style.transform = "translate(680px, 0px)";
    document.getElementById("bikeMoove2").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove2").style.zIndex = "9999";
    //document.getElementById("bubble-text").innerHTML = "8h10 : J’arrive à l’abri-vélo à côté du marché. Super ! Je ne payerai pas le stationnement. Il ne faut pas que j’oublie de passer au stand du boucher.";
  } else if (stepJ === 'step3') {
    console.log("step3");
    document.getElementById("etape1J").style.display = 'none';
    document.getElementById("etape2J").style.display = 'none';
    document.getElementById("etape3J").style.display = 'none';
    document.getElementById("etape4J").style.display = 'block';
    stepJ = 'step4';
    document.getElementById("step3J").style.opacity=0.5;
    //step3.classList.remove("is-active");
    step3J.classList.add("is-complete");
    step4J.classList.add("is-active");
    document.getElementById("imgGraph2").src="imgJeux/jbarchartE4.png";
    document.getElementById("bikeMoove2").style.transform = "translate(1005px, 0px)";
    document.getElementById("bikeMoove2").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove2").style.zIndex = "9999";
    //document.getElementById("bubble-text").innerHTML = "9h10 : Après 1h de courses, je fais un petit détour par le fleuriste pour acheter un nouveau rosier et je rentre à la maison. Il est temps de se mettre en cuisine !";
  } else if (stepJ === 'step4') {
    console.log("step4");
    stepJ = 'complete';
    document.getElementById("step4J").style.opacity=0.5;
    //step4.classList.remove("is-active");
    step4J.classList.add("is-complete");
    document.getElementById("imgGraph2").src="imgJeux/barchartE1.png";
    document.getElementById("bikeMoove2").style.transform = "translate(1005px, 0px)";
    document.getElementById("bikeMoove2").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove2").style.zIndex = "9999";
  } else if (stepJ === 'complete') {
    stepJ = 'step1';
    document.getElementById("etape1J").style.display = 'block';
    document.getElementById("etape2J").style.display = 'none';
    document.getElementById("etape3J").style.display = 'none';
    document.getElementById("etape4J").style.display = 'none';
    document.getElementById("step1J").style.opacity=1;
    document.getElementById("step2J").style.opacity=1;
    document.getElementById("step3J").style.opacity=1;
    document.getElementById("step4J").style.opacity=1;
    step4J.classList.remove("is-active");
    step3J.classList.remove("is-active");
    step2J.classList.remove("is-active");
    step1J.classList.remove("is-active");
    step4J.classList.remove("is-complete");
    step3J.classList.remove("is-complete");
    step2J.classList.remove("is-complete");
    step1J.classList.remove("is-complete");
    document.getElementById("bikeMoove2").style.transform = "translate(0px, 0px)";
    document.getElementById("bikeMoove2").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove2").style.zIndex = "9999";
    step1J.classList.add("is-active");
    //document.getElementById("bubble-text").innerHTML = "8h : J’installe mes sacoches sur mon porte bagage et j’enfourche mon vélo électrique pour me rendre au marché comme chaque mardi. J’aime y être assez tôt pour avoir le choix et les produits les plus frais possible. ";
  }
}

document.getElementById("etape1C").style.display = 'block';
document.getElementById("etape2C").style.display = 'none';
document.getElementById("etape3C").style.display = 'none';
document.getElementById("etape4C").style.display = 'none';
let stepC = 'step1';
step1C.classList.add("is-active");

function nextC(){
  if (stepC === 'step1') {
    console.log("step1");
    document.getElementById("etape1C").style.display = 'none';
    document.getElementById("etape2C").style.display = 'block';
    document.getElementById("etape3C").style.display = 'none';
    document.getElementById("etape4C").style.display = 'none';
    step1C.classList.add("is-active");
    stepC = 'step2';
    //step1.classList.remove("is-active");
    step1C.classList.add("is-complete");
    document.getElementById("step1C").style.opacity=0.5;
    step2C.classList.add("is-active");
    document.getElementById("imgGraph3").src="imgJeux/cbarchartE2.png";
    document.getElementById("bikeMoove3").style.transform = "translate(340px, 0px)";
    document.getElementById("bikeMoove3").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove3").style.zIndex = "9999";
    //document.getElementById("bubble-text").innerHTML = "8h04 : Sur le trajet, je m'arrête à la banque pour retirer quelques billets.";
  } else if (stepC === 'step2') {
    console.log("step2");
    document.getElementById("etape1C").style.display = 'none';
    document.getElementById("etape2C").style.display = 'none';
    document.getElementById("etape3C").style.display = 'block';
    document.getElementById("etape4C").style.display = 'none';
    stepC = 'step3';
    document.getElementById("step2C").style.opacity=0.5;
    //step2.classList.remove("is-active");
    step2C.classList.add("is-complete");
    step3C.classList.add("is-active");
    document.getElementById("imgGraph3").src="imgJeux/cbarchartE3.png";
    document.getElementById("bikeMoove3").style.transform = "translate(680px, 0px)";
    document.getElementById("bikeMoove3").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove3").style.zIndex = "9999";
    //document.getElementById("bubble-text").innerHTML = "8h10 : J’arrive à l’abri-vélo à côté du marché. Super ! Je ne payerai pas le stationnement. Il ne faut pas que j’oublie de passer au stand du boucher.";
  } else if (stepC === 'step3') {
    console.log("step3");
    document.getElementById("etape1C").style.display = 'none';
    document.getElementById("etape2C").style.display = 'none';
    document.getElementById("etape3C").style.display = 'none';
    document.getElementById("etape4C").style.display = 'block';
    stepC = 'step4';
    document.getElementById("step3C").style.opacity=0.5;
    //step3.classList.remove("is-active");
    step3C.classList.add("is-complete");
    step4C.classList.add("is-active");
    document.getElementById("imgGraph3").src="imgJeux/cbarchartE4.png";
    document.getElementById("bikeMoove3").style.transform = "translate(1005px, 0px)";
    document.getElementById("bikeMoove3").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove3").style.zIndex = "9999";
    //document.getElementById("bubble-text").innerHTML = "9h10 : Après 1h de courses, je fais un petit détour par le fleuriste pour acheter un nouveau rosier et je rentre à la maison. Il est temps de se mettre en cuisine !";
  } else if (stepC === 'step4') {
    console.log("step4");
    stepC = 'complete';
    document.getElementById("step4C").style.opacity=0.5;
    //step4.classList.remove("is-active");
    step4C.classList.add("is-complete");
    document.getElementById("imgGraph3").src="imgJeux/barchartE1.png";
    document.getElementById("bikeMoove3").style.transform = "translate(1005px, 0px)";
    document.getElementById("bikeMoove3").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove3").style.zIndex = "9999";
  } else if (stepC === 'complete') {
    stepC = 'step1';
    document.getElementById("etape1C").style.display = 'block';
    document.getElementById("etape2C").style.display = 'none';
    document.getElementById("etape3C").style.display = 'none';
    document.getElementById("etape4C").style.display = 'none';
    document.getElementById("step1C").style.opacity=1;
    document.getElementById("step2C").style.opacity=1;
    document.getElementById("step3C").style.opacity=1;
    document.getElementById("step4C").style.opacity=1;
    step4C.classList.remove("is-active");
    step3C.classList.remove("is-active");
    step2C.classList.remove("is-active");
    step1C.classList.remove("is-active");
    step4C.classList.remove("is-complete");
    step3C.classList.remove("is-complete");
    step2C.classList.remove("is-complete");
    step1C.classList.remove("is-complete");
    document.getElementById("bikeMoove3").style.transform = "translate(0px, 0px)";
    document.getElementById("bikeMoove3").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove3").style.zIndex = "9999";
    step1C.classList.add("is-active");
    //document.getElementById("bubble-text").innerHTML = "8h : J’installe mes sacoches sur mon porte bagage et j’enfourche mon vélo électrique pour me rendre au marché comme chaque mardi. J’aime y être assez tôt pour avoir le choix et les produits les plus frais possible. ";
  }
}




let gifJeanne ="oui";
let gifJerome ="oui";
let gifCamille ="oui";


function jeanne() {
    console.log(personnage);
    personnage = "jeanne";
    console.log(personnage);
    if(gifJeanne==="oui"){
      document.getElementById("jeanne").src="imgChoixPersona/jeanneA.gif"; //jjjjjjjjj
    }
    gifJerome="oui";
    gifCamille="oui";
    gifJeanne="non";
    document.getElementById("camille").style.opacity=0.5;
    document.getElementById("jerome").style.opacity=0.5;
    document.getElementById("jeanne").style.opacity=1;
    document.getElementById("descriptionPersona").style.display = 'block';
    document.getElementById("titlePersona").innerHTML = "Jeanne";
    document.getElementById("contentPersona").innerHTML = "Jeanne, 63 ans, hyper active, vit sa retraite à vélo. Vivant près du Jardin des plantes, elle aime le calme et le grand air. Grand-mère de deux petits-enfants, elle les reçoit tous les mardis avec sa fille pour dîner. Jeanne adore cuisiner des produits frais. Elle se rend donc chaque semaine au marché des Halles de St Nazaire pour y faire ses emplettes.";
}

function jeanneOut(){
  document.getElementById("jeanne").src="imgChoixPersona/jeanneR.gif"; //jjjjjjjjj
}

function camille() {
    console.log(personnage);
    personnage = "camille";
    console.log(personnage);
    document.getElementById("jeanne").style.opacity=0.5;
    document.getElementById("jerome").style.opacity=0.5;
    document.getElementById("camille").style.opacity=1;
    if(gifCamille==="oui"){
      document.getElementById("camille").src="imgChoixPersona/camilleA.gif"; //jjjjjjjjj
    }
    gifCamille="non";
    gifJerome="oui";
    gifJeanne="oui";
    //document.getElementById("camille").style.zIndex = "10";
    document.getElementById("descriptionPersona").style.display = 'block';
    document.getElementById("titlePersona").innerHTML = "Camille";
    document.getElementById("contentPersona").innerHTML = "Camille, 19 ans, se met en selle tous les matins pour aller à l’IUT de Saint-Nazaire où elle étudie les relations internationales. Elle habite Pornichet et met environ 20 min pour rejoindre son école. Fille du bord de mer, Camille est sportive et aime vivre au grand air. Le vélo lui permet de bien commencer la journée et de faire des économies.";
}

function camilleOut(){
  document.getElementById("camille").src="imgChoixPersona/camilleR.gif"; //jjjjjjjjj
}

function jerome() {
    console.log(personnage);
    personnage = "jerome";
    console.log(personnage);
    document.getElementById("jeanne").style.opacity=0.5;
    document.getElementById("camille").style.opacity=0.5;
    document.getElementById("jerome").style.opacity=1;
    if(gifJerome==="oui"){
      document.getElementById("jerome").src="imgChoixPersona/jeromeA.gif"; //jjjjjjjjj
    }
    gifCamille="oui";
    gifJerome="non";
    gifJeanne="oui";
    document.getElementById("descriptionPersona").style.display = 'block';
    document.getElementById("titlePersona").innerHTML = "Jerome";
    document.getElementById("contentPersona").innerHTML = "Jérome, 38 ans, travaille aux Chantiers de l’Atlantique. Avec sa compagne et leur fille de 8 ans, ils se sont installés à la Bouletterie. Ingénieur en construction navale, il est conscient de l’impact des émissions de CO2 sur l’environnement. Il tente donc de compenser au mieux en se rendant chaque jour au boulot à vélo, tout en accompagnant sa fille à l’école.";
}

function jeromeOut(){
  document.getElementById("jerome").src="imgChoixPersona/jeromeR.gif"; //jjjjjjjjj
}


function scrollToSection(){
  if(personnage==="camille"){
    $('html, body').animate({
         scrollTop: $('#JeuCamille').offset().top
    }, 500);
  }
    if(personnage==="jerome"){
    $('html, body').animate({
         scrollTop: $('#JeuJerome').offset().top
    }, 500);
  }
    if(personnage==="jeanne"){
    $('html, body').animate({
         scrollTop: $('#JeuJeanne').offset().top
    }, 500);
  }
    setTimeout(function(){
      haveScroll="ok";
    }, 2000);

}

$('document').ready(function() {
var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
    if(haveScroll==="ok"){
      console.log("down");
       var target = $('#last');
          if (target.length)
          {
              var top = target.offset().top;
              $('html,body').animate({scrollTop: top}, 0);
          }
    }
   }
   else if(st == lastScrollTop)
   {
     //do nothing
     //In IE this is an important condition because there seems to be some instances where the last scrollTop is equal to the new one
   }
   else {
      console.log("up")
   }
   lastScrollTop = st;
   haveScroll="no";
});});





function test(){
$('html, body').animate({
         scrollTop: $('#sectionPersona').offset().top
    }, 500);
document.getElementById('mavideo').style.display = 'none';

}


function goPageCamille(){
  $('html, body').animate({
         scrollTop: $('#JeuCamille').offset().top
    }, 500);
}

function goPageJerome(){
  $('html, body').animate({
         scrollTop: $('#JeuJerome').offset().top
    }, 500);
}

function goPageJeanne(){
  $('html, body').animate({
         scrollTop: $('#JeuJeanne').offset().top
    }, 500);
}
