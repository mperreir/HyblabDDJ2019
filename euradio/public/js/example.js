'use strict';

// No need for window.onload event here since we are using the def attribute
// when loading our scripts

// Load a dummy json file using the fetch API
fetch('data/dummy.json')
    // this promise will be fulfilled when the json fill will be
    .then(function (response){
        // if we could load the resource, parse it
        if( response.ok )
            return response.json();
        else // if not, send some error message as JSON data
            return {data: "JSON file not found"};

    })
    // in case of invalid JSON (parse error) send some error message as JSON data
    .catch( function (error){
        return {data: "Invalid JSON"};
    })
    // this promise will be fulfilled when the json will be parsed
    .then(function (json) {
        document.querySelector('#data')
            .textContent = json.data;
    });

    //Pour le onepage
      new fullpage('#fullpage', {
      });
      //fullpage_api.setAllowScrolling(false);
      $('.down').click(function(){ //Fleche du bas qui fait changer la slide
        fullpage_api.moveSectionDown();
      });
      $('.up').click(function(){ //Fleche du haut qui fait changer la slide
        fullpage_api.moveSectionUp();
      });

      var maison = true;
      var radio = false;
      var recepteur = false;
      var route = false;
      var voiture = false;

      $('#maison').on({
        mouseenter: function () {
          if(!maison){
            document.getElementById('maison').src="img/Picto/Picto maison - blanc.png"
          }
        },
        mouseleave: function () {
          if(!maison){
            document.getElementById('maison').src="img/Picto/Picto maison - bleu.png"
          }
        },
      });
      $('#radio').on({
        mouseenter: function () {
          if(!radio){
            document.getElementById('radio').src="img/Picto/Picto radio - blanc.png"
          }
        },
        mouseleave: function () {
          if(!radio){
            document.getElementById('radio').src="img/Picto/Picto radio - bleu.png"
          }
        },
      });
      $('#recepteur').on({
        mouseenter: function () {
          if(!recepteur){
            document.getElementById('recepteur').src="img/Picto/Picto recepteur - blanc.png"
          }
        },
        mouseleave: function () {
          if(!recepteur){
            document.getElementById('recepteur').src="img/Picto/Picto recepteur - bleu.png"
          }
        },
      });
      $('#route').on({
        mouseenter: function () {
          if(!route){
            document.getElementById('route').src="img/Picto/Picto route - blanc.png"
          }
        },
        mouseleave: function () {
          if(!route){
            document.getElementById('route').src="img/Picto/Picto route - bleu.png"
          }
        },
      });
      $('#voiture').on({
        mouseenter: function () {
          if(!voiture){
            document.getElementById('voiture').src="img/Picto/Picto voiture - blanc.png"
          }
        },
        mouseleave: function () {
          if(!voiture){
            document.getElementById('voiture').src="img/Picto/Picto voiture - bleu.png"
          }
        },
      });


      function pictoChanging(maison2,radio2,recepteur2,route2,voiture2) {
        maison = maison2;
        radio = radio2;
        recepteur =recepteur2;
        route = route2;
        voiture =voiture2;
        if (maison) {
          document.getElementById('maison').src="img/Picto/Picto maison - blanc.png"
        }else{
          document.getElementById('maison').src="img/Picto/Picto maison - bleu.png"
        }
        if (radio) {
          document.getElementById('radio').src="img/Picto/Picto radio - blanc.png"
        }else{
          document.getElementById('radio').src="img/Picto/Picto radio - bleu.png"
        }
        if (recepteur) {
          document.getElementById('recepteur').src="img/Picto/Picto recepteur - blanc.png"
        }else{
          document.getElementById('recepteur').src="img/Picto/Picto recepteur - bleu.png"
        }
        if (route) {
          document.getElementById('route').src="img/Picto/Picto route - blanc.png"
        }else{
          document.getElementById('route').src="img/Picto/Picto route - bleu.png"
        }
        if (voiture) {
          document.getElementById('voiture').src="img/Picto/Picto voiture - blanc.png"
        }else{
          document.getElementById('voiture').src="img/Picto/Picto voiture - bleu.png"
        }
      }
      var xPosBleu ;
      var xPosJaune ;
      var valBleu;
      var valJaune;
      $('#bleu').draggable({
        axis: "x",
        grid: [ 57, 10 ],
        drag: function( event, ui ) {
          var offset = $(this).offset(); // Avoir les coordonnées du slider
          var xPos = offset.left; //
          valBleu = parseInt((xPos - xPosBleu)/57);
        },
        create: function(event,ui){
          xPosBleu = $(this).offset().left;
          valBleu = 0;
        },
        start: function(){
          document.getElementById('partieGauche').style.width=(10*valJaune-2)+"%";
          document.getElementById('partieDroite').style.width=(10*(10-valJaune)-2)+"%";
          console.log((10*valJaune-2)+"%");
        },
        containment: "parent"
      });
      $('#jaune').draggable({
        axis: "x",
        grid: [ 57, 10 ],
        drag: function( event, ui ) {
          var offset = $(this).offset(); // Avoir les coordonnées du slider
          var xPos = offset.left; //
          valJaune = parseInt((xPos - xPosJaune)/57)+5;
        },
        create: function(event,ui){
          xPosJaune = $(this).offset().left;
          valJaune = 5;
        },
        start: function(){
          document.getElementById('partieGauche').style.width=(10*(valBleu+1)-2)+"%";
          document.getElementById('partieDroite').style.width=(10*(10-(valBleu+1))-2)+"%";
          console.log((10*(valBleu+1)-2)+"%");
        },
        containment: "parent"
      });
      d3.csv("csv/vehicule.csv").then(function(data) {
          console.log(data); // [{"Hello": "world"}, …]
      });
