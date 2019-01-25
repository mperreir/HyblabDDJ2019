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


function en_route(){
  document.getElementsByClassName("bouton_accueil")[0].textContent = "GO ! ";
  document.getElementById("velo_accueil").style.display="block";
  document.getElementById("dial_accueil").style.display="block";
  document.getElementsByClassName("bouton_accueil")[0].addEventListener("click", go);
}


function go(){
  document.getElementById("accueil").style.display="none";
  document.getElementById("carte_generale").style.display="block";
  document.getElementById("velo_carte_generale").style.display="block";
  document.getElementById("dial_carte_generale").style.display="block";
}

function personnaliser(){
  document.getElementById("carte_generale").style.display="none";
  document.getElementById("personnalisation").style.display="block";
  document.getElementById("velo_personnalisation").style.display="block";
  document.getElementById("curseurs").style.display="block";
}

function click_curseur_theme(x) {
  document.getElementById("num_theme").value = x ;
}

function click_curseur_dist(x) {
  document.getElementById("distance").value = x ;
}

var nb = document.getElementById("distance").value;
document.getElementById("val").innerHTML = Math.round(nb*10) /10;

function actualiser_dist() {
  var nb = document.getElementById("distance").value;
  document.getElementById("val").innerHTML = Math.round(nb*10) /10;
}


function c_est_parti(){
  document.getElementById("personnalisation").style.display="none";
  var dist = document.getElementById("distance").value;
  var num_theme = document.getElementById("num_theme").value;
  var theme = document.getElementById("theme").getElementsByTagName("li")[num_theme-1].innerHTML;
}
