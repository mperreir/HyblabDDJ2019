'use strict';

// No need for window.onload event here since we are using the def attribute
// when loading our scripts

// Map des circuits et des lieux
var map_circuits = new Map();
var map_lieux = new Map();
// infos sur les circuits
var liste_infos_circuit = charger_donnees('nom-circuit-info');

// Fonction pour charger la liste des noms de fichier à récupérer
function charger_donnees(lien){
  return fetch('data/' + lien + '.json')
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
      .then(function (data) {
        return data;
      });
}

//Fonction pour remplir les maps avec les infos des fichiers récupérés
async function construire_map(map, folder, lien, indice) {
  let liste_interne = await charger_donnees(lien);
  liste_interne.forEach(function(element) {
  //console.log(element['nom circuit']);
  fetch(folder + element[indice] + '.json')
    .then(function (response) {
      if( response.ok )
        return response.json();
      else
        return {data: "JSON file not found"};
    })
    .then( function (json) {
        map.set(element[indice], json);
        // Ajouter de l'affichage ici
    })
    .catch( function (error) {
      return {data: "Invalid JSON"};
    })
  });
}



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

// Appel des fonctions pour charger les maps en mémoire 
construire_map(map_circuits, 'data/trace-circuit-json/', 'nom-circuit', 'nom circuit');
construire_map(map_lieux, 'data/trace-lieux-json/', 'nom-lieux', 'nom lieu');
