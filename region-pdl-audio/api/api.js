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
    var date_min = 9999;
    var date_max = 0;
    json.forEach(element => {
        if (element['Durée réelle du fichier (hh:mn:ss)'].split(':') !== undefined) {
            var duree = element['Durée réelle du fichier (hh:mn:ss)'].split(':');
            var seconds = (+duree[0]) * 3600 + (+duree[1]) * 60 + (+duree[2]);
            duree_totale += seconds;
        }
        if (element['Poids du fichier \r\n(octets)'] !== undefined) {
            taille_totale += parseInt(element['Poids du fichier \r\n(octets)'].replace(/,/g, ''));
        }
        if (element["Numéro d'ordre du fichier dans la série des fichiers de la réunion"] == 1) {
            nb_reunion += 1;
        }

        if (date_min > element['Année'] && element['Année'] != 'inconnue') {
            date_min = element['Année']
        }
        if (date_max < element['Année'] && element['Année'] != 'inconnue') {
            date_max = element['Année']
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
        'nb_reunion': nb_reunion,
        'date_min': date_min,
        'date_max': date_max
    }

    response.send(JSON.stringify(data));
});

app.get('/audios', function (request, response) {
    var nb_fichier_audio = json.length;
    var audios = [];
    json.forEach(element => {
        var info = {};
        info['president'] = element['Président du Conseil régional à la date de la réunion'];
        if (info['president'].includes('inconnu')) {
            info['president'] = 'Non renseigné';
        }
        info['annee'] = element['Année'];
        info['intitule'] = element['Intitulé de la réunion'];
        var date = element['Dates (générales) de la séance / réunion'];
        if (date.includes(',')) {
            date = date.split('-');
            if (date.length == 2) {
                var date_1 = date[0].split('/');
                if (date_1.length == 3) {
                    if (date_1[0].length == 1) {
                        date_1[0] = '0' + date_1[0];
                    }
                    if (date_1[1].length == 1) {
                        date_1[1] = '0' + date_1[1];
                    }
                    if (date_1[2].length == 3) {
                        date_1[2] = '19' + date_1[2];
                    }
                    date[0] = date_1[0] + '/' + date_1[1] + '/' + date_1[2];
                }
                else {
                    date[0] = 'Non renseigné';
                }
                var date_2 = date[1].split('/');
                if (date_2.length == 3) {
                    if (date_2[0].length == 1) {
                        date_2[0] = '0' + date_2[0];
                    }
                    if (date_2[1].length == 1) {
                        date_2[1] = '0' + date_2[1];
                    }
                    if (date_2[2].length == 2) {
                        date_2[2] = '19' + date_2[2];
                    }
                    date[1] = date_2[0] + '/' + date_2[1] + '/' + date_2[2];
                }
                else {
                    date[1] = 'Non renseigné';
                }
                info['date_general'] = date[0] + ',' + date[1];
            }
            else {
                info['date_general'] = 'Non renseigné';
            }
        }
        else if (!(date.includes('-'))) {
            date = date.split('/');
            if (date.length == 3) {
                if (date[0].length == 1) {
                    date[0] = '0' + date[0];
                }
                if (date[1].length == 1) {
                    date[1] = '0' + date[1];
                }
                if (date[2].length == 2) {
                    date[2] = '19' + date[2];
                }
                info['date_general'] = date[0] + '/' + date[1] + '/' + date[2];
            }
            else {
                info['date_general'] = 'Non renseigné';
            }
        }
        else {
            info['date_general'] = date;
        }


        date = element["Date(s) de l'enregistrement portée(s) sur le support d'enregistrement initial"];
        if (date.includes(',')) {
            date = date.split(',');
            if (date.length == 2) {
                var date_1 = date[0].split('/');
                if (date_1.length == 3) {
                    if (date_1[0].length == 1) {
                        date_1[0] = '0' + date_1[0];
                    }
                    if (date_1[1].length == 1) {
                        date_1[1] = '0' + date_1[1];
                    }
                    if (date_1[2].length == 3) {
                        date_1[2] = '19' + date_1[2];
                    }
                    date[0] = date_1[0] + '/' + date_1[1] + '/' + date_1[2];
                }
                else {
                    date[0] = 'Non renseigné';
                }
                var date_2 = date[1].split('/');
                if (date_2.length == 3) {
                    if (date_2[0].length == 1) {
                        date_2[0] = '0' + date_2[0];
                    }
                    if (date_2[1].length == 1) {
                        date_2[1] = '0' + date_2[1];
                    }
                    if (date_2[2].length == 2) {
                        date_2[2] = '19' + date_2[2];
                    }
                    date[1] = date_2[0] + '/' + date_2[1] + '/' + date_2[2];
                }
                else {
                    date[1] = 'Non renseigné';
                }
                info['date_enregistrement'] = date[0] + ',' + date[1];
            }
            else {
                info['date_enregistrement'] = 'Non renseigné';
            }
        }
        else if (!(date.includes('-'))) {
            date = date.split('/');
            if (date.length == 3) {
                if (date[0].length == 1) {
                    date[0] = '0' + date[0];
                }
                if (date[1].length == 1) {
                    date[1] = '0' + date[1];
                }
                if (date[2].length == 2) {
                    date[2] = '19' + date[2];
                }
                info['date_enregistrement'] = date[0] + '/' + date[1] + '/' + date[2];
            }
            else {
                info['date_enregistrement'] = 'Non renseigné';
            }
        }
        else {
            info['date_enregistrement'] = date;
        }

        info['objet'] = element['Objet général de la séance / réunion'];

        info['numero_ordre'] = element["Numéro d'ordre du fichier dans la série des fichiers de la réunion"];
        info['reference'] = element['Référence du support sonore initial '];
        info['identifiant'] = element['Identifiant fichier son'];
        var duree = element['Durée réelle du fichier (hh:mn:ss)'].split(':');
        info['duree'] = {
            'heure': duree[0],
            'minute': duree[1],
            'seconde': duree[2]
        };
        info['poids'] = element['Poids du fichier \r\n(octets)'];
        info['qualite'] = element['Evaluation qualité sonore du fichier (note de 1 à 10)'];
        var mot_cle = [];
        if (element['mots-clés associés à la réunion '] !== undefined) {
            mot_cle = element['mots-clés associés à la réunion '].split(' ; ')
        }
        else {
            mot_cle = ['Non renseigné'];
        }

        info['mot_cle'] = mot_cle;

        audios.push(info);
    });
    var data = {
        'nb_fichier_audio': nb_fichier_audio,
        'audios': audios
    }

    response.send(JSON.stringify(data));
});

app.get('/reunions', function (request, response) {
    var nb_reunion = 0;
    var reunions = [];
    var nb_audio = 0;
    var duree = { 'heure': 0, 'minute': 0, 'seconde': 0 };
    var info = {};
    json.forEach(element => {
        if (element["Numéro d'ordre du fichier dans la série des fichiers de la réunion"] == 1) {
            if (nb_reunion > 0) {
                info['nb_audio'] = nb_audio;
                info['duree'] = duree;
                nb_audio = 0;
                duree = { 'heure': 0, 'minute': 0, 'seconde': 0 };
                reunions.push(info);
                info = {};
            }
            info['president'] = element['Président du Conseil régional à la date de la réunion'];
            if (info['president'].includes('inconnu')) {
                info['president'] = 'Non renseigné';
            }

            info['annee'] = element['Année'];
            var duree_enregistrement = element['Durée réelle du fichier (hh:mn:ss)'].split(':');
            duree['heure'] += parseInt(duree_enregistrement[0]);
            duree['minute'] += parseInt(duree_enregistrement[1]);
            duree['seconde'] += parseInt(duree_enregistrement[2]);

            var date = element['Dates (générales) de la séance / réunion'];
            if (date.includes(',')) {
                date = date.split(',');
                if (date.length == 2) {
                    var date_1 = date[0].split('/');
                    if (date_1.length == 3) {
                        if (date_1[0].length == 1) {
                            date_1[0] = '0' + date_1[0];
                        }
                        if (date_1[1].length == 1) {
                            date_1[1] = '0' + date_1[1];
                        }
                        if (date_1[2].length == 3) {
                            date_1[2] = '19' + date_1[2];
                        }
                        date[0] = date_1[0] + '/' + date_1[1] + '/' + date_1[2];
                    }
                    else {
                        date[0] = 'Non renseigné';
                    }
                    var date_2 = date[1].split('/');
                    if (date_2.length == 3) {
                        if (date_2[0].length == 1) {
                            date_2[0] = '0' + date_2[0];
                        }
                        if (date_2[1].length == 1) {
                            date_2[1] = '0' + date_2[1];
                        }
                        if (date_2[2].length == 2) {
                            date_2[2] = '19' + date_2[2];
                        }
                        date[1] = date_2[0] + '/' + date_2[1] + '/' + date_2[2];
                    }
                    else {
                        date[1] = 'Non renseigné';
                    }
                    info['date'] = date[0] + ',' + date[1];
                }
                else {
                    info['date'] = 'Non renseigné';
                }
            }
            else if (!(date.includes('-'))) {
                date = date.split('/');
                if (date.length == 3) {
                    if (date[0].length == 1) {
                        date[0] = '0' + date[0];
                    }
                    if (date[1].length == 1) {
                        date[1] = '0' + date[1];
                    }
                    if (date[2].length == 2) {
                        date[2] = '19' + date[2];
                    }
                    info['date'] = date[0] + '/' + date[1] + '/' + date[2];
                }
                else {
                    info['date'] = 'Non renseigné';
                }
            }
            else {
                info['date'] = date;
            }

            if (element['mots-clés associés à la réunion '] !== undefined) {
                info['mot_cle'] = element['mots-clés associés à la réunion '].split(' ; ')
            }
            else {
                info['mot_cle'] = ['Non renseigné'];
            }

            if (element['Objet général de la séance / réunion'] === undefined) {
                info['objet_general'] = 'Non renseigné';
            }
            else {
                info['objet_general'] = element['Objet général de la séance / réunion'];
            }

            nb_reunion += 1;
        }
        nb_audio += 1;
    });

    var data = {
        'nb_reunion': nb_reunion,
        'reunions': reunions
    }
    response.send(JSON.stringify(data));
});

app.get('/type_reunions', function (request, response) {
    var nb_reunion_periode_1 = 0;
    var nb_reunion_periode_2 = 0;
    var nb_reunion_periode_3 = 0;
    var periode_1 = {};
    var periode_2 = {};
    var periode_3 = {};
    json.forEach(element => {
        if (element["Numéro d'ordre du fichier dans la série des fichiers de la réunion"] == 1) {
            var annee = element['Année'];
            var objet = element['Objet général de la séance / réunion'];

            if (objet === undefined) {
                objet = 'Non référencé';
            }
            
            if (objet[objet.length-1] == ' '){
                objet = objet.substr(0, objet.length-1);
            }

            if (objet.includes('Décision modificative')) {
                objet = 'Décision modificative';
            }

            if (objet.includes('Séance extraordinaire')) {
                objet = 'Séance extraordinaire';
            }

            if (annee >= 1974 && annee < 1986) {
                nb_reunion_periode_1 += 1;
                if (periode_1[objet] === undefined) {
                    periode_1[objet] = 0;
                }
                periode_1[objet] += 1;
            }
            else if (annee >= 1986 && annee < 1992) {
                nb_reunion_periode_2 += 1;
                if (periode_2[objet] === undefined) {
                    periode_2[objet] = 0;
                }
                periode_2[objet] += 1;
            }
            else if (annee >= 1992 && annee <= 1994) {
                nb_reunion_periode_3 += 1;
                if (periode_3[objet] === undefined) {
                    periode_3[objet] = 0;
                }
                periode_3[objet] += 1;
            }
        }

    });

    var data = {
        'periode_1': {
            'nb_reunion': nb_reunion_periode_1,
            'objet': periode_1
        },
        'periode_2': {
            'nb_reunion': nb_reunion_periode_2,
            'objet': periode_2
        },
        'periode_3': {
            'nb_reunion': nb_reunion_periode_3,
            'objet': periode_3
        }
    }
    response.send(JSON.stringify(data));
});

// export de notre application vers le serveur principal
module.exports = app;