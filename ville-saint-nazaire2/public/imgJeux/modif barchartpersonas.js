70 : <img class="imgGraph" id="imgGraph" src="imgJeux/BARCHART all étape 1 (1).png" />
134 : <img class="imgGraph" id="imgGraph" src="imgJeux/BARCHART all étape 1 (1).png" />
197 : <img class="imgGraph" id="imgGraph" src="imgJeux/BARCHART all étape 1 (1).png" />


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
    document.getElementById("imgGraph3").src="imgJeux/BARCHART camille étape 2.png";
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
    document.getElementById("imgGraph3").src="imgJeux/BARCHART camille étape 3.png";
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
    document.getElementById("imgGraph3").src="imgJeux/BARCHART camille étape 4.png";
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
    document.getElementById("imgGraph3").src="imgJeux/BARCHART all étape 1 (1).png";
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
