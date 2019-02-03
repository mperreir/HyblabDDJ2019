'use strict';


var mySVGsToInject = document.querySelectorAll('.circuit');
SVGInjector(mySVGsToInject, null, function(){
  $("#bouton_accueil").fadeIn();
});

// infos sur les circuits
var liste_infos_circuit = charger_donnees('nom-circuit-info');

// Fonction pour charger la liste des noms de fichier à récupérer
function charger_donnees(lien){
  return fetch('data/' + lien + '.json')
    .then(function (response){
      if( response.ok )
        return response.json();
      else
        return {data: "JSON file not found"};
    })
      .catch( function (error){
        return {data: "Invalid JSON"};
      })
      .then(function (data) {
        return data;
      });
    }

async function en_avant_toute(){
  document.getElementById("accueil").style.display="none";
  document.getElementById("presentation").style.display="block";
  document.getElementById("leon_mov").currentTime = 0;
  document.getElementById("leon_mov").play();

}
function d_accord(){
  document.getElementById("bulle_presentation2").style.display="block";
  document.getElementById("reponse2").style.display="block";
  document.getElementById("reponse1").setAttribute("src", "img/ecran2//Bulle_D_accord.png");
  document.getElementById("reponse1").style.width="10vw";

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
  document.getElementById("circuits").style.display="block";

  // Certains elements de la carte bug, on les enleve
  document.getElementsByClassName("cls-5112")[0].style.display="none";
  document.getElementsByClassName("cls-5101")[0].style.display="none";
  document.getElementsByClassName("cls-5097")[0].style.display="none";
  document.getElementsByClassName("cls-5103")[0].style.display="none";
  document.getElementsByClassName("cls-5104")[0].style.display="none";
  document.getElementsByClassName("cls-5115")[0].style.display="none";
  document.getElementsByClassName("cls-5116")[0].style.display="none";
  document.getElementsByClassName("cls-5117")[0].style.display="none";
  document.getElementsByClassName("cls-5117")[0].style.display="none";
  var x = document.getElementsByClassName("cls-5089");
  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  var nb_circuit = 0;
  selection_circuit(dist, theme)
  .then(function(value){
    value.forEach(function(element){
      var numero = element["numero"];
      document.getElementById("Itineraire_" + numero).style.display="block";

      nb_circuit = nb_circuit + 1;
      document.getElementById("liste_parcours").innerHTML += '<input onclick="modif_radio()" onmouseover="enlever_circuits('+numero+')" onmouseout="afficher_circuit()" class="parcours_disponible" id="checkbox_circuit_'+numero+'" type="radio" name="parcours_disponible"  value=' +numero + '><label onmouseover="enlever_circuits('+numero+')" onmouseout="afficher_circuit()" id="label_checkbox_circuit_'+numero+'" for="checkbox_circuit_'+numero+'">' + element["nom"] + '</label><br>';
      document.getElementById("Itineraire_" + numero).addEventListener("click", function(){
        document.getElementById("checkbox_circuit_"+numero).checked=true;
        modif_radio();
      })
    });

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
    maj_filtres();
  });

}

function afficher_circuit(){
  var dist = document.getElementById("distance").value;
  var num_theme = document.getElementById("num_theme").value;
  var theme = document.getElementById("theme").getElementsByTagName("li")[3-num_theme].innerHTML;
  selection_circuit(dist, theme)
  .then(function(v){
    v.forEach(function(e){
      var n = e["numero"];
      document.getElementById("Itineraire_" + n).style.display="block";
    })
  })
}

function enlever_circuits(e){
  liste_infos_circuit
  .then(function(value){
    for (var x = 1; x < value.length+1; x++){
      if (x != e){
        var nom = "Itineraire_" + x.toString();
        var iti = document.getElementById(nom);
        iti.style.display="none";
      }
    }
  })
}

function selection_circuit(distance, theme){
  return liste_infos_circuit
  .then(function(value){
    theme = theme.toLowerCase();
    distance = parseInt(distance);

    var liste_circuit_selection_interne = [];
    value.forEach(function(element){
      document.getElementById("Itineraire_" + element["numero"]).style.display="none";
      if (element["distance_en_km"] <= distance && element["theme"].includes(theme)){
        document.getElementById("Itineraire_" + element["numero"]).style.display="block";
        liste_circuit_selection_interne.push(element);
      }
    });
    return liste_circuit_selection_interne
  });
}

function modif_checkbox(element){
  var dist = document.getElementById("distance").value;
  var num_theme = document.getElementById("num_theme").value;
  var theme = document.getElementById("theme").getElementsByTagName("li")[3-num_theme].innerHTML;
  selection_circuit(dist, theme)
  .then(function(v){
    v.forEach(function(e){
      var n = e["numero"];
      if(document.getElementById(element + "" +n)){
        var checkbox = document.getElementById(element+"-checkbox");
        if (checkbox.checked)
          document.getElementById(element + "" + n).style.display="block";
        else
          document.getElementById(element + "" + n).style.display="none";
        var exist = true;
        var cpt = 2;
        while(exist){
          if (document.getElementById(element + "" +n + "-" + cpt)){
            if (checkbox.checked)
              document.getElementById(element + "" +n + "-" + cpt).style.display="block";
            else
              document.getElementById(element + "" +n + "-" + cpt).style.display="none";
            cpt++;
          }
          else{
            exist = false;
          }
        }
      }
    })
  })
}

function retour() {
  document.getElementById("page_personnalisation").style.display="block";
  document.getElementById("page_carte").style.display="none";
  var collection_lieu = document.getElementsByClassName("lieu");
  for (var i = 0; i < collection_lieu.length; i++) {
    collection_lieu[i].style.zIndex="1";
  }
  reset_value_default();
}

function maj_filtres(){
  modif_checkbox("Wifi");
  modif_checkbox("Point_dinteret");
  modif_checkbox("Toilettes");
  modif_checkbox("Monument");
  modif_checkbox("Bar");
  modif_checkbox("Restau");
}

function reset_value_default(){
  document.getElementById("distance").value=20;
  document.getElementById("num_theme").value=2;
  document.getElementById("val").innerHTML = 20;
  document.getElementById("Wifi-checkbox").checked=false;
  document.getElementById("Point_dinteret-checkbox").checked=false;
  document.getElementById("Toilettes-checkbox").checked=false;
  document.getElementById("Monument-checkbox").checked=false;
  document.getElementById("Bar-checkbox").checked=false;
  document.getElementById("Restau-checkbox").checked=false;
  actualiser_decor();
  document.getElementById("liste_parcours").innerHTML = " ";
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
        var minutes = value[numero]["temps_en_min"] % 60;
        var heures = Math.trunc(value[numero]["temps_en_min"] / 60);
        document.getElementById("nom_circuit").innerHTML = value[numero]["nom"];
        document.getElementById("kilometre_temps").innerHTML = value[numero]["distance_en_km"] + "km  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + heures + "H" + minutes;
        document.getElementById("description").innerHTML = value[numero]["description"];
        document.getElementById("text_avant_pdf").innerHTML = "Ce parcours vous plaît ? Vous pouvez télécharger sa feuille de route :";

      })
    }
  }
}



reset_value_default();
