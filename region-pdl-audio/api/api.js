
'use strict';

// import du module Express
var express = require('express');
var path = require('path');
var XLSX = require('xlsx');
var app = express();

var file = path.join(__dirname, './data/2018_12_12 JDD sons.xlsx');
var workbook = XLSX.readFile(file);
var worksheet = workbook.Sheets['Données'];
var json = XLSX.utils.sheet_to_json(worksheet);


app.get('/stats_audio', function (request, response) {
    var nb_fichier_audio = json.length;
    var duree_totale = 0;
    var taille_totale = 0;
    var nb_reunion = 0;
    json.forEach(element => {
        if (element['Durée réelle du fichier (hh:mn:ss)'].split(':') !== undefined) {
            var duree = element['Durée réelle du fichier (hh:mn:ss)'].split(':');
            var seconds = (+duree[0]) * 3600 + (+duree[1]) * 60 + (+duree[2]);
            duree_totale += seconds;
        }
        if (element['Poids du fichier \r\n(octets)'] !== undefined) {
            taille_totale += parseInt(element['Poids du fichier \r\n(octets)'].replace(/,/g, ''));
        }
        if (element["Numéro d'ordre du fichier dans la série des fichiers de la réunion"] == 1){
            nb_reunion += 1;
        }
    });

    var heures = Math.floor(duree_totale / 3600);
    var minutes = Math.floor((duree_totale % 3600) / 60);
    var secondes = (duree_totale % 3600) % 60;

    var data = {
        'nb_fichier_audio': nb_fichier_audio,
        'heures': heures,
        'minutes': minutes,
        'secondes': secondes,
        'taille_totale': taille_totale,
        'nb_reunion': nb_reunion
    }

    response.send(JSON.stringify(data));
});

app.get('/audios', function (request, response) {
    var nb_fichier_audio = json.length;
    var audios = [];
    var mot_cles = { '1974-1986': {}, '1987-1992': {}, '1993-1994': {} };
    json.forEach(element => {
        var info = {};
        info['president'] = element['Président du Conseil régional à la date de la réunion'];
        info['annee'] = element['Année'];
        info['intitule'] = element['Intitulé de la réunion'];
        info['date_general'] = element['Dates (générales) de la séance / réunion'];
        info['objet'] = element['Objet général de la séance / réunion'];
        info['date_enregistrement'] = element["Date(s) de l'enregistrement portée(s) sur le support d'enregistrement initial"];
        info['numero_ordre'] = element["Numéro d'ordre du fichier dans la série des fichiers de la réunion"];
        info['reference'] = element['Référence du support sonore initial '];
        info['identifiant'] = element['Identifiant fichier son'];
        var duree = element['Durée réelle du fichier (hh:mn:ss)'].split(':');
        info['duree'] = {
            'heure': parseInt(duree[0]),
            'minute': parseInt(duree[1]),
            'seconde': parseInt(duree[2])
        };
        info['poids'] = element['Poids du fichier \r\n(octets)'];
        info['qualite'] = element['Evaluation qualité sonore du fichier (note de 1 à 10)'];
        var mot_cle = [];
        if (element['mots-clés associés à la réunion '] !== undefined) {
            mot_cle = element['mots-clés associés à la réunion '].split(' ; ')
            //console.log(mot_cle)
        }
        /*mot_cle.forEach(element => {
            var annee = '1974-1986';

            if (info['annee'] > 1986 && info['annee'] <= 1992) {
                annee = '1987-1992';
            }
            else if (info['annee'] > 1992 && info['annee'] <= 1994) {
                annee = '1993-1994';
            }

            
            if (mot_cles[annee][element] === undefined) {
                mot_cles[annee][element] = 1;
            }
            else {
                if (info['numero_ordre'] == 1) {
                    mot_cles[annee][element] += 1;
                }
            }

        });*/
        info['mot_cle'] = mot_cle;

        audios.push(info);
    });
    //console.log(mot_cles);
    var data = {
        'nb_fichier_audio': nb_fichier_audio,
        'audios': audios
    }

    response.send(JSON.stringify(data));
});

// export de notre application vers le serveur principal
module.exports = app;