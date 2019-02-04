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
      var reseau = false;
      var donneeAffichee ="maison";


      /*var xPosBleu ;
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
      });*/
var pays =["Norvège","Pays-Bas","Danemark","Belgique","Allemagne","Suisse","France","Italie","Russie"];
      var ourData;
       d3.csv("csv/Donnees.csv").then(function(data) {
          console.log(data); // [{"Hello": "world"}, …]
          //console.log(data[10])
          ourData=data;
          affichageGraphique(data);
      });
var ctx;
var xPosRouge ;
var xPosJaune ;
var valRouge=2;
var valJaune=0;
var myLineChart;
var otherLineChart;
var reseauRougeData;
var reseauJauneData;
var chartData;
var chartData2;
function affichageGraphique(data,val1,val2){


  /*$('#radio').on({
    mouseenter: function () {
      if(!radio){
        document.getElementById('radio').src="img/Picto/Picto radio-blanc.png"
      }
    },
    mouseleave: function () {
      if(!radio){
        document.getElementById('radio').src="img/Picto/Picto radio-bleu.png"
      }
    },
  });*/



   chartData2 = {
      labels: ['% de Véhicules en France'], // responsible for how many bars are gonna show on the chart
      // create 12 datasets, since we have 12 items
      // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
      // put 0, if there is no data for the particular bar
      datasets: [{
        data: [data[valJaune][donneeAffichee],100-data[valJaune][donneeAffichee]],
        backgroundColor: ['rgba(252, 233, 55, 1)','rgba(252, 233, 55, 0)'], // green
        borderColor:['rgba(252, 233, 55, 1)','rgba(252, 233, 55, 1)'],
        borderWidth:5

      }],


  };

  var opt2 = {
    responsive: false,
    legend: {
          display: false
      },
    scales: {
       xAxes: [{
          /*stacked: true,*/ // this should be set to make the bars stacked
          display:false
       }],
       yAxes: [{
          /*stacked: true,*/ // this also..
          display:false
       }]
    },
    cutoutPercentage: 70,
    segmentShowStroke: false
  };
   var ctx2 = document.getElementById("ctx2"),
       otherLineChart = new Chart(ctx2, {
          type: 'doughnut',
          data: chartData2,
          options: opt2,

       });
   chartData = {
      labels: ['% de Véhicules en Norvège'], // responsible for how many bars are gonna show on the chart
      // create 12 datasets, since we have 12 items
      // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
      // put 0, if there is no data for the particular bar
      datasets: [{
        data: [data[valJaune][donneeAffichee],100-data[valJaune][donneeAffichee]],
        backgroundColor: ['rgba(230, 55, 75, 1)','rgba(230, 55, 75, 0)'], // green
        borderColor:['rgba(230, 55, 75, 1)','rgba(230, 55, 75, 1)'],
        borderWidth:5

      }],


  };

   reseauJauneData = {
      labels: ['% de Véhicules en Norvège'], // responsible for how many bars are gonna show on the chart
      // create 12 datasets, since we have 12 items
      // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
      // put 0, if there is no data for the particular bar
      datasets: [{
        data: [data[valJaune]["reseau"],100-data[valJaune]["reseau"]],
        backgroundColor: ['rgba(252, 233, 55, 1)','rgba(252, 233, 55, 0)'], // green
        borderColor:['rgba(252, 233, 55, 1)','rgba(252, 233, 55, 1)'],
        borderWidth:5

      },
      {
        data: [data[valJaune]["reseau2"],100-data[valJaune]["reseau2"]],
        backgroundColor: ['rgba(252, 210, 55, 1)','rgba(252, 210, 55, 0)'], // green
        borderColor:['rgba(252, 210, 55, 1)','rgba(252, 210, 55, 1)'],
        borderWidth:5

      }
    ],


  };
   reseauRougeData = {
      labels: ['% de Véhicules en Norvège'], // responsible for how many bars are gonna show on the chart
      // create 12 datasets, since we have 12 items
      // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
      // put 0, if there is no data for the particular bar
      datasets: [{
        data: [data[valRouge]["reseau"],100-data[valRouge]["reseau"]],
        backgroundColor: ['rgba(230, 55, 75, 1)','rgba(230, 55, 75, 0)'], // green
        borderColor:['rgba(230, 55, 75, 1)','rgba(230, 55, 75, 1)'],
        borderWidth:5

      },
      {
        data: [data[valRouge]["reseau2"],100-data[valRouge]["reseau2"]],
        backgroundColor: ['rgba(200, 55, 90, 1)','rgba(200, 55, 90, 0)'], // green
        borderColor:['rgba(200, 55, 90, 1)','rgba(200, 55, 90, 1)'],
        borderWidth:5

      }
    ],


  };

  var opt = {
    responsive: false,
    legend: {
          display: false
      },
    scales: {
       xAxes: [{
          /*stacked: true,*/ // this should be set to make the bars stacked
          display:false
       }],
       yAxes: [{
          /*stacked: true,*/ // this also..
          display:false
       }]
    },
    cutoutPercentage: 70,
    segmentShowStroke: false
  };
  ctx = document.getElementById("ctx"),
       myLineChart = new Chart(ctx, {
          type: 'doughnut',
          data: chartData,
          options: opt,

       });
       $('#maison').on({
         mouseenter: function () {
           if(!maison){
             document.getElementById('maison').src="img/Picto/Picto maison-blanc.png"
           }
         },
         mouseleave: function () {
           if(!maison){
             document.getElementById('maison').src="img/Picto/Picto maison-bleu.png"
           }
         },
         click: function(){
           document.getElementById('pictoCentrale').src="img/Picto/Picto maison-bleu.png"
           pictoChanging(true,false,false,false,false,false);
         }
       });
       $('#recepteur').on({
         mouseenter: function () {
           if(!recepteur){
             document.getElementById('recepteur').src="img/Picto/Picto recepteur-blanc.png"
           }
         },
         mouseleave: function () {
           if(!recepteur){
             document.getElementById('recepteur').src="img/Picto/Picto recepteur-bleu.png"
           }
         },
         click: function(){
           document.getElementById('pictoCentrale').src="img/Picto/Picto recepteur-bleu.png"
           pictoChanging(false,false,true,false,false,false);
         }
       });
       $('#route').on({
         mouseenter: function () {
           if(!route){
             document.getElementById('route').src="img/Picto/Picto route-blanc.png"
           }
         },
         mouseleave: function () {
           if(!route){
             document.getElementById('route').src="img/Picto/Picto route-bleu.png"
           }
         },
         click: function(){
           document.getElementById('pictoCentrale').src="img/Picto/Picto route-bleu.png"
           pictoChanging(false,false,false,true,false,false);
         }
       });
       $('#voiture').on({
         mouseenter: function () {
           if(!voiture){
             document.getElementById('voiture').src="img/Picto/Picto voiture-blanc.png"
           }
         },
         mouseleave: function () {
           if(!voiture){
             document.getElementById('voiture').src="img/Picto/Picto voiture-bleu.png"
           }
         },
         click: function(){
           document.getElementById('pictoCentrale').src="img/Picto/Picto voiture-bleu.png"
           pictoChanging(false,false,false,false,true,false);
         }
       });
       $('#reseau').on({
         mouseenter: function () {
           if(!reseau){
             document.getElementById('reseau').src="img/Picto/Picto couverture réseaux-blanc.png"
           }
         },
         mouseleave: function () {
           if(!reseau){
             document.getElementById('reseau').src="img/Picto/Picto couverture réseaux-bleu.png"
           }
         },
         click: function(){
           document.getElementById('pictoCentrale').src="img/Picto/Picto couverture réseaux-bleu.png"
           pictoChanging(false,false,false,false,false,true);
         }
       });



       function pictoChanging(maison2,radio2,recepteur2,route2,voiture2,reseau2) {
         maison = maison2;
         radio = radio2;
         recepteur =recepteur2;
         route = route2;
         voiture =voiture2;
         reseau =reseau2;
         if (maison) {
           document.getElementById('maison').src="img/Picto/Picto maison-blanc.png";
           document.getElementById('critere').innerHTML="TAUX D’ÉQUIPEMENT EN RÉCEPTEURS DAB+ ";
           donneeAffichee ="maison";
         }else{
           document.getElementById('maison').src="img/Picto/Picto maison-bleu.png"
         }
         /*if (radio) {
           document.getElementById('radio').src="img/Picto/Picto radio-blanc.png";
           document.getElementById('critere').innerHTML="DAB/DAB+ : COUVERTURE ROUTIÈRE";
           donneeAffichee ="radio";
         }else{
           document.getElementById('radio').src="img/Picto/Picto radio-bleu.png"
         }*/
         if (recepteur) {
           document.getElementById('recepteur').src="img/Picto/Picto recepteur-blanc.png";
           document.getElementById('critere').innerHTML="NOMBRE DE STATIONS NATIONALES DIFFUSANT EN DAB/DAB+ / EN FM";
           donneeAffichee ="recepteur";
         }else{
           document.getElementById('recepteur').src="img/Picto/Picto recepteur-bleu.png"
         }
         if (route) {
           document.getElementById('route').src="img/Picto/Picto route-blanc.png";
           document.getElementById('critere').innerHTML="DAB/DAB+ : TAUX DE COUVERTURE ROUTIÈRE  du DAB+";
           donneeAffichee ="route";
         }else{
           document.getElementById('route').src="img/Picto/Picto route-bleu.png"
         }
         if (voiture) {
           document.getElementById('voiture').src="img/Picto/Picto voiture-blanc.png"
           document.getElementById('critere').innerHTML=" TAUX DES NOUVEAUX VÉHICULES INTÉGRANTS LE DAB+";
           donneeAffichee ="voiture";
         }else{
           document.getElementById('voiture').src="img/Picto/Picto voiture-bleu.png"
         }
         if (reseau) {
           document.getElementById('reseau').src="img/Picto/Picto couverture réseaux-blanc.png"
           document.getElementById('critere').innerHTML="ÉTENDUE DE LA COUVERTURE DU RÉSEAU DAB/DAB+ en 2013 / en 2018";
           donneeAffichee ="reseau";
         }else{

           document.getElementById('reseau').src="img/Picto/Picto couverture réseaux-bleu.png"
         }
         refreshOtherLine(otherLineChart,data);
         refreshMyLine(myLineChart,data);
       }

document.getElementById('paysJaune').innerHTML=data[valJaune]["nomPays"];
document.getElementById('paysRouge').innerHTML=data[valRouge]["nomPays"];
document.getElementById('valeurJaune').innerHTML=data[valJaune][donneeAffichee]+"%";
document.getElementById('valeurRouge').innerHTML=data[valRouge][donneeAffichee]+"%";
//fin Graphiques
$('#rouge').draggable({
  axis: "x",
  grid: [ 64, 10 ],
  drag: function( event, ui ) {
    var offset = $(this).offset(); // Avoir les coordonnées du slider
    var xPos = offset.left; //
    valRouge = parseInt((xPos - xPosRouge)/64)+2;
    console.log(valRouge);
    refreshMyLine(myLineChart,data);
  },
  create: function(event,ui){
    xPosRouge = $(this).offset().left;
  },
  containment: "parent"
});
$('#jaune').draggable({
  axis: "x",
  grid: [ 63, 10 ],
  drag: function( event, ui ) {
    var offset = $(this).offset(); // Avoir les coordonnées du slider
    var xPos = offset.left; //
    valJaune = parseInt((xPos - xPosJaune)/62);
    //var chartData2 =
    refreshOtherLine(otherLineChart,data);

  },
  create: function(event,ui){
    xPosJaune = $(this).offset().left;
  },
  containment: "parent"
});



};
function refreshMyLine(chart,data) {
  if(donneeAffichee=="reseau"){
    chart.data = reseauRougeData;
    chart.data.datasets[0].data = [data[valRouge][donneeAffichee],100-data[valRouge][donneeAffichee]];
    chart.data.datasets[1].data = [data[valRouge]["reseau2"],100-data[valRouge]["reseau2"]];
    if (data[valRouge]["nomPays"]=="Pays-Bas"){
      document.getElementById('valeurRouge').innerHTML="ND / "+data[valRouge][donneeAffichee]+"%";
    }else{
      document.getElementById('valeurRouge').innerHTML=data[valRouge]["reseau2"]+"% / "+data[valRouge][donneeAffichee]+"%";
    }

  }else if(donneeAffichee=="recepteur"){
    chart.data = chartData;
    chart.data.datasets[0].data = [data[valRouge][donneeAffichee],data[valRouge]["recepteur2"]];
    document.getElementById('valeurRouge').innerHTML=data[valRouge][donneeAffichee]+" / "+data[valRouge]["recepteur2"];
  }else{
    if (((data[valRouge]["nomPays"]=="Belgique"|data[valRouge]["nomPays"]=="Pays-Bas"|data[valRouge]["nomPays"]=="Suisse") && donneeAffichee=="maison")|(data[valRouge]["nomPays"]=="France"&donneeAffichee=="route")){
      document.getElementById('valeurRouge').innerHTML="ND";
    }else{
      document.getElementById('valeurRouge').innerHTML=data[valRouge][donneeAffichee]+"%";
    }
    chart.data = chartData;
    chart.data.datasets[0].data = [data[valRouge][donneeAffichee],100-data[valRouge][donneeAffichee]];

  }

  chart.update();
  document.getElementById('paysRouge').innerHTML=data[valRouge]["nomPays"];
}
function refreshOtherLine(chart,data) {
  if(donneeAffichee=="reseau"){
    chart.data = reseauJauneData;
    chart.data.datasets[0].data = [data[valJaune][donneeAffichee],100-data[valJaune][donneeAffichee]];
    chart.data.datasets[1].data = [data[valJaune]["reseau2"],100-data[valJaune]["reseau2"]];
    if (((data[valJaune]["nomPays"]=="Belgique"|data[valJaune]["nomPays"]=="Pays-Bas"|data[valJaune]["nomPays"]=="Suisse") && donneeAffichee=="maison")|(data[valJaune]["nomPays"]=="France"&donneeAffichee=="route")){
      document.getElementById('valeurJaune').innerHTML="ND / "+data[valJaune][donneeAffichee]+"%";
    }else{
      document.getElementById('valeurJaune').innerHTML=data[valJaune]["reseau2"]+"% / "+data[valJaune][donneeAffichee]+"%";
    }

  }else if(donneeAffichee=="recepteur"){
    chart.data = chartData2;
    chart.data.datasets[0].data = [data[valJaune][donneeAffichee],data[valJaune]["recepteur2"]];
    document.getElementById('valeurJaune').innerHTML=data[valJaune][donneeAffichee]+" / "+data[valJaune]["recepteur2"];
  }else{
    if ((data[valJaune]["nomPays"]=="France"|data[valJaune]["nomPays"]=="Belgique"|data[valJaune]["nomPays"]=="Pays-Bas") && donneeAffichee=="maison"){
      document.getElementById('valeurJaune').innerHTML="ND";
    }else{
      document.getElementById('valeurJaune').innerHTML=data[valJaune][donneeAffichee]+"%";
    }

    chart.data = chartData2;
    chart.data.datasets[0].data = [data[valJaune][donneeAffichee],100-data[valJaune][donneeAffichee]];

  }
  chart.update();
  document.getElementById('paysJaune').innerHTML=data[valJaune]["nomPays"];
}
