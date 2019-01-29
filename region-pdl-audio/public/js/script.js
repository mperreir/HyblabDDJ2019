'use strict';

// No need for window.onload event here since we are using the def attribute
// when loading our scripts


$('#fullpage').fullpage({
    scrollingSpeed: 750,
    anchors: ['1stPage', '2ndPage', '3rdPage', '4thPage', '5thPage', '6thPage', '7thPage', '8thPage'],
    sectionsColor: ['#FFFFFF', '#184525', '#244525', '#561125', '#616161', '#892236', '#495368', '#135786'],
    verticalCentered: false,
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['First page', 'Second page', 'Third page', 'Fourth page', 'Fifth page', 'Sixth page', 'Seventh page', 'Eighth and last page'],
    onLeave: function (index, nextIndex, direction) {
        var ind = index.index + 1;
        var nextInd = nextIndex.index + 1;
        if (nextInd == 2){
            var nav = document.querySelector("body.fp-viewing-1stPage #fp-nav")
            nav.style.transition = "1s top linear";
        }
        if (direction == "up") {
            $(".section").removeClass("down");
            $(".section").removeClass("next");
            $(".section").removeClass("prev");
            $("#fullpage .section:nth-child(" + nextInd + ")").addClass("up");
            $("#fullpage .section:nth-child(" + ind + ")").addClass("next up");
            $("#fullpage .section:nth-child(" + nextInd + ")").prev().addClass("prev up");
        } else {
            $(".section").removeClass("up");
            $(".section").removeClass("next");
            $(".section").removeClass("prev");
            $("#fullpage .section:nth-child(" + nextInd + ")").addClass("down");
            $("#fullpage .section:nth-child(" + nextInd + ")").next().addClass("next down");
            $("#fullpage .section:nth-child(" + ind + ")").addClass("prev down");
        }
    },
});


$('.arrowUp').click(function () {
    $.fn.fullpage.moveSectionUp();
});

$('.arrowDown').click(function () {
    $.fn.fullpage.moveSectionDown();
});

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
        document.querySelector('#nb_fichier_audio')
            .textContent = json.nb_fichier_audio;
        document.querySelector('#duree_totale')
            .textContent = json.heures + "h" + json.minutes + " min(s) et " + json.secondes + " seconde(s)";
        document.querySelector('#taille_totale')
            .textContent = json.taille_totale;
    });