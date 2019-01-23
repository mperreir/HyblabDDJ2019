
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
    json.forEach(element => {
        if (element['Durée réelle du fichier (hh:mn:ss)'].split(':') !== undefined) {
            var duree = element['Durée réelle du fichier (hh:mn:ss)'].split(':');
            var seconds = (+duree[0]) * 3600 + (+duree[1]) * 60 + (+duree[2]);
            duree_totale += seconds;
        }
        if (element['Poids du fichier \r\n(octets)'] !== undefined) {
            taille_totale += parseInt(element['Poids du fichier \r\n(octets)'].replace(/,/g, ''));
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
        'taille_totale': taille_totale
    }

    response.send(JSON.stringify(data));
});
// export de notre application vers le serveur principal
module.exports = app;