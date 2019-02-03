let slide=0;

$(document).ready(function() {
    
    //activate wow.js
     new WOW().init();
  
    //activate fullpage.js
    $('#fullpage').fullpage({
      scrollBar: true,
      navigation: true,
      navigationTooltips: ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'],
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

function next() {
  if (step === 'step1') {
    step = 'step2';
    step1.classList.remove("is-active");
    step1.classList.add("is-complete");
    step2.classList.add("is-active");
    document.getElementById("imgGraph").src="imgJeux/barChart.png";
    document.getElementById("bikeMoove").style.transform = "translate(340px, 0px)";
    document.getElementById("bikeMoove").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove").style.zIndex = "9999";
    document.getElementById("bubble-text").innerHTML = "Content Step1 this is a simple bubble effect width CSS pseudo element";
  } else if (step === 'step2') {
    step = 'step3';
    step2.classList.remove("is-active");
    step2.classList.add("is-complete");
    step3.classList.add("is-active");
    document.getElementById("imgGraph").src="bimgJeux/barChart.png";
    document.getElementById("bikeMoove").style.transform = "translate(680px, 0px)";
    document.getElementById("bikeMoove").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove").style.zIndex = "9999";
    document.getElementById("bubble-text").innerHTML = "Content Step2 this is a simple bubble effect width CSS pseudo element";
  } else if (step === 'step3') {
    step = 'complete';
    step3.classList.remove("is-active");
    step3.classList.add("is-complete");
    step4.classList.add("is-active");
    document.getElementById("imgGraph").src="imgJeux/barChart.png";
    document.getElementById("bikeMoove").style.transform = "translate(1005px, 0px)";
    document.getElementById("bikeMoove").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove").style.zIndex = "9999";
    document.getElementById("bubble-text").innerHTML = "Content Step3 this is a simple bubble effect width CSS pseudo element";

  } else if (step === 'complete') {
    step = 'step1';
    step4.classList.remove("is-complete");
    step3.classList.remove("is-complete");
    step2.classList.remove("is-complete");
    step1.classList.remove("is-complete");
    document.getElementById("bikeMoove").style.transform = "translate(0px, 0px)";
    document.getElementById("bikeMoove").style.transition = "transform 1.2s";
    document.getElementById("bikeMoove").style.zIndex = "9999";
    step1.classList.add("is-active");
    document.getElementById("bubble-text").innerHTML = "Content Step1 this is a simple bubble effect width CSS pseudo element";
  }
}

function jeanne() {
    document.getElementById("camille").style.opacity=0.5;  
    document.getElementById("jerome").style.opacity=0.5; 
    document.getElementById("jeanne").style.opacity=1;  
    document.getElementById("descriptionPersona").style.display = 'block';
    document.getElementById("titlePersona").innerHTML = "Jeanne";
    document.getElementById("contentPersona").innerHTML = "Jeanne, 63 ans, hyper active, vit sa retraite à vélo. Vivant près du Jardin des plantes, elle aime le calme et le grand air. Grand-mère de deux petits-enfants, elle les reçoit tous les mardis avec sa fille pour dîner. Jeanne adore cuisiner des produits frais. Elle se rend donc chaque semaine au marché des Halles de St Nazaire pour y faire ses emplettes.";
    document.getElementById("goPersona").href="jeanne.html"; 
}

function camille() {
    document.getElementById("jeanne").style.opacity=0.5;  
    document.getElementById("jerome").style.opacity=0.5; 
    document.getElementById("camille").style.opacity=1; 
    document.getElementById("descriptionPersona").style.display = 'block'; 
    document.getElementById("titlePersona").innerHTML = "Camille";
    document.getElementById("contentPersona").innerHTML = "Camille, 19 ans, se met en selle tous les matins pour aller à l’IUT de Saint-Nazaire où elle étudie les relations internationales. Elle habite Pornichet et met environ 20 min pour rejoindre son école. Fille du bord de mer, Camille est sportive et aime vivre au grand air. Le vélo lui permet de bien commencer la journée et de faire des économies.";
    document.getElementById("goPersona").href="camille.html"; 
}

function jerome() {
    document.getElementById("jeanne").style.opacity=0.5;  
    document.getElementById("camille").style.opacity=0.5; 
    document.getElementById("jerome").style.opacity=1;  
    document.getElementById("descriptionPersona").style.display = 'block';
    document.getElementById("titlePersona").innerHTML = "Jerome";
    document.getElementById("contentPersona").innerHTML = "Jérome, 38 ans, travaille aux Chantiers de l’Atlantique. Avec sa compagne et leur fille de 8 ans, ils se sont installés à la Bouletterie. Ingénieur en construction navale, il est conscient de l’impact des émissions de CO2 sur l’environnement. Il tente donc de compenser au mieux en se rendant chaque jour au boulot à vélo, tout en accompagnant sa fille à l’école.";
    document.getElementById("goPersona").href="jerome.html"; 
}

/*
function yourfunction() { 
    var x = document.getElementById("txt");
    setTimeout(function(){ 
        document.getElementById("jeanne").style.transform = "translate(0px, 200.5%)" ;
        document.getElementById("jeanne").style.transition = "transform 1.2s";
    }, 500);
    setTimeout(function(){ 
        document.getElementById("camille").style.transform = "translate(0px, 223.5%)" ;
        document.getElementById("camille").style.transition = "transform 1.2s";
    }, 1000);
    setTimeout(function(){ 
        document.getElementById("jerome").style.transform = "translate(0px, 189.5%)" ;
        document.getElementById("jerome").style.transition = "transform 1.2s";
    }, 1500);

}

window.onload = yourfunction;
*/