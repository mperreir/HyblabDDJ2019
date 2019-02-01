'use strict';

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

async function en_avant_toute(){
  document.getElementById("accueil").style.display="none";
  document.getElementById("presentation").style.display="block";
  document.getElementById("leon_mov").currentTime = 0;
}

function d_accord(){
  document.getElementById("oval1").setAttribute("src", "img/ecran2/oval_non_actif.svg");
  document.getElementById("oval2").setAttribute("src", "img/ecran2/oval_actif.svg");
  document.getElementById("bulle_presentation").setAttribute("src", "img/ecran2/bulle_2.png");
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

function actualiser_dist() {
  var nb = document.getElementById("distance").value;
  document.getElementById("val").innerHTML = nb;
  actualiser_decor();
}

function actualiser_decor() {
  var dist = parseInt(document.getElementById("distance").value);
  var num_theme = parseInt(document.getElementById("num_theme").value);
  /* Mise a jour suivant la distance */
  if (dist < 16.6)
    document.getElementById("velo_curseurs").setAttribute("src", "img/slider/leon_velo_court.png");
  else if (dist > 23.3)
    document.getElementById("velo_curseurs").setAttribute("src", "img/slider/leon_velo_long.png");
  else
    document.getElementById("velo_curseurs").setAttribute("src", "img/slider/leon_velo_moyen.png");
  /* Mise a jour suivant le theme */
  if(num_theme == 1){
    document.getElementById("socle_curseurs").setAttribute("src", "img/slider/socle_foret.png");
    document.getElementById("page_personnalisation").style.backgroundImage = "url('img/slider/fond_slider_foret.png')";
    document.getElementById("objet_curseurs").setAttribute("src", "img/slider/objet_foret.svg");
  }
  else if(num_theme == 2){
    document.getElementById("socle_curseurs").setAttribute("src", "img/slider/socle_musee.png");
    document.getElementById("page_personnalisation").style.backgroundImage = "url('img/slider/fond_slider_musee.png')";
    document.getElementById("objet_curseurs").setAttribute("src", "img/slider/objet_musee.svg");
  }
  else {
    document.getElementById("socle_curseurs").setAttribute("src", "img/slider/socle_mer.png");
    document.getElementById("page_personnalisation").style.backgroundImage = "url('img/slider/fond_slider_mer.png')";
    document.getElementById("objet_curseurs").setAttribute("src", "img/slider/objet_mer.svg");
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
      document.getElementById("circuit-0" + element["numero"]).style.display="block";
      nb_circuit = nb_circuit + 1;
      document.getElementById("liste_parcours").innerHTML += '<input class="parcours_disponible" type="radio" name="parcours_disponible" onclick="modif_radio()" value=' + element["numero"] + '>' + element["nom"] + '<br>';
    })

    switch (nb_circuit) {
      case 0:
        document.getElementById("texte_leon_circuit").innerHTML = "Je n'ai malheureusement pas trouvé de parcours avec ces données..";
        document.getElementById("texte_leon_circuit2").innerHTML = "Essayez avec d'autres paramètres";
      break;
      case 1:
        document.getElementById("texte_leon_circuit").innerHTML = "J'ai trouvé un parcours qui pourrait vous plaire !";
        document.getElementById("texte_leon_circuit2").innerHTML = "Cliquez dessus pour en savoir plus.";
      break;
      default:
        document.getElementById("texte_leon_circuit").innerHTML = "J'ai trouvé " + nb_circuit + " parcours qui pourraient vous plaire !";
        document.getElementById("texte_leon_circuit2").innerHTML = "Cliquez sur l'un d'eux pour en savoir plus.";
    }

    switch (theme) {
      case 'Forêt / Nature':
        document.getElementById("socle_carte").setAttribute("src", "img/slider/socle_foret.png");
      break;
      case 'Plage / Bord de Mer':
        document.getElementById("socle_carte").setAttribute("src", "img/slider/socle_mer.png");
      break;
      default:
        document.getElementById("socle_carte").setAttribute("src", "img/slider/socle_musee.png");
    }
    if (dist < 16.6)
      document.getElementById("leon_carte").setAttribute("src", "img/slider/leon_velo_court.png");
    else if (dist > 23.3)
      document.getElementById("leon_carte").setAttribute("src", "img/slider/leon_velo_long.png");
    else
      document.getElementById("leon_carte").setAttribute("src", "img/slider/leon_velo_moyen.png");
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

function retour() {
  document.getElementById("page_personnalisation").style.display="block";
  document.getElementById("page_carte").style.display="none";
  document.getElementById("carte_generale").style.display="none";
  for (var i = 1; i < 10; i++)
    document.getElementById("circuit-0" + i).style.display="none";
  var collection_lieu = document.getElementsByClassName("lieu");
  for (var i = 0; i < collection_lieu.length; i++) {
    collection_lieu[i].style.zIndex="1";
  }
  reset_value_default();
}

function reset_value_default(){
  document.getElementById("distance").value=20;
  document.getElementById("num_theme").value=2;
  document.getElementById("val").innerHTML = 20;
  document.getElementById("hotspot-checkbox").checked=false;
  document.getElementById("culturels-checkbox").checked=false;
  document.getElementById("toilettes-checkbox").checked=false;
  document.getElementById("office-checkbox").checked=false;
  document.getElementById("bars-checkbox").checked=false;
  document.getElementById("restaurants-checkbox").checked=false;
  actualiser_decor();
  document.getElementById("liste_parcours").innerHTML = '';
  document.getElementById("choix_parcours").style.display = "none";
}

function modif_radio(){
  document.getElementById("choix_parcours").style.display = "block";
  var collection_radio = document.getElementsByClassName("parcours_disponible");
  for (var i = 0; i < collection_radio.length; i++) {
    if (collection_radio[i].checked){
      var numero = collection_radio[i].value -1
      liste_infos_circuit
      .then(function(value){
        document.getElementById("nom_circuit").innerHTML = value[numero]["nom"];
        document.getElementById("kilometre_temps").innerHTML = value[numero]["distance_en_km"] + " et " + value[numero]["temps_en_min"];
        document.getElementById("description").innerHTML = value[numero]["description"];
      })
    }
  }
}



reset_value_default();