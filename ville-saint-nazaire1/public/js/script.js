'use strict';

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

async function en_avant_toute(){
  /* Création des maps contenant les données */
  await construire_map(map_circuits, 'data/trace-circuit-json/', 'nom-circuit', 'nom circuit');
  await construire_map(map_lieux, 'data/trace-lieux-json/', 'nom-lieux', 'nom lieu');
  /* Mise a jour de l'affichage */
  document.getElementById("accueil").style.display="none";
  document.getElementById("presentation").style.display="block";
  document.getElementById("leon_mov").currentTime = 0;
}

function d_accord(){
  document.getElementById("oval1").setAttribute("src", "img/oval_non_actif.svg");
  document.getElementById("oval2").setAttribute("src", "img/oval_actif.svg");
  document.getElementById("bulle_presentation").setAttribute("src", "img/bulle_2.png");
  document.getElementById("bouton_presentation").setAttribute("onclick", "curseurs()");
}

function curseurs(){
  document.getElementById("presentation").style.display="none";
  document.getElementById("page_personnalisation").style.display="block";
}

function click_curseur_theme(x) {
  document.getElementById("num_theme").value = x ;
  actualiser_decor();
}

function click_curseur_dist(x) {
  document.getElementById("distance").value = x ;
  actualiser_dist();
}

var nb = document.getElementById("distance").value;
document.getElementById("val").innerHTML = Math.round(nb*10) /10;
actualiser_decor();
document.getElementById("hotspot-checkbox").checked=false;
document.getElementById("culturels-checkbox").checked=false;
document.getElementById("toilettes-checkbox").checked=false;
document.getElementById("office-checkbox").checked=false;

function actualiser_dist() {
  var nb = document.getElementById("distance").value;
  document.getElementById("val").innerHTML = Math.round(nb*10) /10;
  actualiser_decor();
}

function actualiser_decor() {
  var dist = parseInt(document.getElementById("distance").value);
  var num_theme = parseInt(document.getElementById("num_theme").value);
  /* Mise a jour suivant la distance */
  if (dist < 16.6)
    document.getElementById("velo_curseurs").setAttribute("src", "img/leon_velo_court.png");
  else if (dist > 23.3)
    document.getElementById("velo_curseurs").setAttribute("src", "img/leon_velo_long.png");
  else
    document.getElementById("velo_curseurs").setAttribute("src", "img/leon_velo_moyen.png");
  /* Mise a jour suivant le theme */
  if(num_theme == 1){
    document.getElementById("socle_curseurs").setAttribute("src", "img/socle_foret.png");
    document.getElementById("page_personnalisation").style.backgroundImage = "url('img/fond_slider_foret.png')";
    document.getElementById("objet_curseurs").setAttribute("src", "img/objet_foret.png");
  }
  else if(num_theme == 2){
    document.getElementById("socle_curseurs").setAttribute("src", "img/socle_musee.png");
    document.getElementById("page_personnalisation").style.backgroundImage = "url('img/fond_slider_musee.png')";
    document.getElementById("objet_curseurs").setAttribute("src", "img/objet_musee.png");
  }
  else {
    document.getElementById("socle_curseurs").setAttribute("src", "img/socle_mer.png");
    document.getElementById("page_personnalisation").style.backgroundImage = "url('img/fond_slider_mer.png')";
    document.getElementById("objet_curseurs").setAttribute("src", "img/objet_mer.png");
  }
}

function c_est_parti(){
  document.getElementById("page_personnalisation").style.display="none";
  var dist = document.getElementById("distance").value;
  var num_theme = document.getElementById("num_theme").value;
  var theme = document.getElementById("theme").getElementsByTagName("li")[3-num_theme].innerHTML;

  document.getElementById("page_carte").style.display="block";
  document.getElementById("carte_generale").style.display="block";
  //console.log(theme);
  var nb_circuit = 0;
  selection_circuit(dist, theme)
  .then(function(value){
    value.forEach(function(element){
      var numero = element["numero"];
      document.getElementById("circuit-0" + numero).style.display="block";
      nb_circuit = nb_circuit + 1;
    })
    document.getElementById("texte_leon_circuit").innerHTML = "J'ai trouvé " + nb_circuit + " parcours qui pourraient vous plaire !";
    switch (theme) {
    case 'Forêt / Nature':
      document.getElementById("socle_carte").setAttribute("src", "img/socle_foret.png");
    break;
    case 'Plage / Bord de Mer':
      document.getElementById("socle_carte").setAttribute("src", "img/socle_mer.png");
    break;
    default:
      document.getElementById("socle_carte").setAttribute("src", "img/socle_musee.png");
    }
    if (dist < 16.6)
      document.getElementById("leon_carte").setAttribute("src", "img/leon_velo_court.png");
    else if (dist > 23.3)
      document.getElementById("leon_carte").setAttribute("src", "img/leon_velo_long.png");
    else
      document.getElementById("leon_carte").setAttribute("src", "img/leon_velo_moyen.png");
  });
}

function selection_circuit(distance, theme){
  return liste_infos_circuit
  .then(function(value){
    theme = theme.toLowerCase();
    distance = parseInt(distance);
    var liste_circuit_selection_interne = [];
    value.forEach(function(element){
      if (element["distance_en_km"] <= distance && element["theme"].includes(theme)){
        liste_circuit_selection_interne.push(element);
      }
    });
    return liste_circuit_selection_interne
  });
}

function modif_checkbox(element){
  var checkbox = document.getElementById(element+"-checkbox");
  if (checkbox.checked)
    document.getElementById(element).style.zIndex="4";
  else
    document.getElementById(element).style.zIndex="1";
}
