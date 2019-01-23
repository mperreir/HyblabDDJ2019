'use strict';

// No need for window.onload event here since we are using the def attribute
// when loading our scripts

// Load a dummy json file using the fetch API
fetch('data/dummy.json')
    // this promise will be fulfilled when the json fill will be
    .then(function (response) {
        // if we could load the resource, parse it
        if (response.ok)
            return response.json();
        else // if not, send some error message as JSON data
            return { data: "JSON file not found" };

    })
    // in case of invalid JSON (parse error) send some error message as JSON data
    .catch(function (error) {
        return { data: "Invalid JSON" };
    })
    // this promise will be fulfilled when the json will be parsed
    .then(function (json) {
        document.querySelector('#data')
            .textContent = json.data;
    });


fetch('data/stats_audio')
    .then(function (response) {
        return response.json();
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function (json) {
        console.log(json);
        document.querySelector('#nb_fichier_audio')
            .textContent = json.nb_fichier_audio;
        document.querySelector('#duree_totale')
            .textContent = json.heures + "h" + json.minutes + " min(s) et " + json.secondes + " seconde(s)";
          document.querySelector('#taille_totale')
            .textContent = json.taille_totale;
    });