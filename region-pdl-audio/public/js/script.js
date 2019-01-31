'use strict';

// No need for window.onload event here since we are using the def attribute
// when loading our scripts


$('#fullpage').fullpage({
    scrollingSpeed: 750,
    anchors: ['1stPage', '2ndPage', '3rdPage', '4thPage', '5thPage', '6thPage', '7thPage', '8thPage'],
    sectionsColor: ['#FFFFFF', '#184525', '#244525', '#561125', '#FFFFFF', '#892236', '#495368', '#135786'],
    verticalCentered: false,
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['First page', 'Second page', 'Third page', 'Fourth page', 'Fifth page', 'Sixth page', 'Seventh page', 'Eighth and last page'],
    onLeave: function (index, nextIndex, direction) {
        var ind = index.index + 1;
        var nextInd = nextIndex.index + 1;
        if (nextInd == 2 && ind == 1) {
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

// Récupération des stats sur les audios (nombre, durée, taille)
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
        document.querySelector('#nb_reunion')
            .textContent = json.nb_reunion;
    });

// Récupération des infos sur les audios
function graph_update_audio() {
    fetch('data/audios')
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function (json) {
            console.log('json');
            var graph = document.querySelector('#graph_k7');
            var k7_div = document.createElement('div');
            var largeur_k7 = 2;
            var hauteur_k7 = 4.5;
            var number_per_col = Math.trunc(graph.offsetHeight / Math.trunc(window.innerHeight * (hauteur_k7 / 100)));
            var number_of_col = Math.trunc(graph.offsetWidth / Math.trunc(window.innerWidth * (largeur_k7 / 100)))
            var count = 0;

            function sliderInit() {
                $('#graph_k7').slick({
                    slidesToShow: number_of_col,
                    slidesToScroll: number_of_col,
                    infinite: false
                });
            };

            json.audios.forEach(element => {
                count++;
                var k7_img = document.createElement('img');
                k7_img.setAttribute('src', 'img/k7_vierge.svg');
                k7_img.style.width = largeur_k7 + 'vw';
                k7_img.style.height = hauteur_k7 + 'vh';
                k7_img.onclick = function () {
                    var zone_info = document.querySelector('#enregistrement_info');
                    while (zone_info.firstChild) {
                        zone_info.removeChild(zone_info.firstChild);
                    }

                    var parag_president = document.createElement('p');
                    var president_title = document.createElement('span');
                    var president_data = document.createElement('span');
                    president_title.innerHTML = 'Président : ';
                    president_title.className = 'enregistrement_title';
                    president_data.innerHTML = element['president'];
                    president_data.className = 'enregistrement_data';
                    parag_president.appendChild(president_title);
                    parag_president.appendChild(president_data);

                    var parag_date = document.createElement('p');
                    var date_title = document.createElement('span');
                    var date_data = document.createElement('span');
                    date_title.innerHTML = 'Date : ';
                    date_title.className = 'enregistrement_title';
                    date_data.innerHTML = element['date_general'];
                    date_data.className = 'enregistrement_data';
                    parag_date.appendChild(date_title);
                    parag_date.appendChild(date_data);

                    var parag_duree = document.createElement('p');
                    var duree_title = document.createElement('span');
                    var duree_data = document.createElement('span');
                    duree_title.innerHTML = 'Durée : ';
                    duree_title.className = 'enregistrement_title';
                    duree_data.innerHTML = element['duree']['heure'] + ':' + element['duree']['minute'] + ':' + element['duree']['seconde'];
                    duree_data.className = 'enregistrement_data';
                    parag_duree.appendChild(duree_title);
                    parag_duree.appendChild(duree_data);

                    var parag_ref = document.createElement('p');
                    var ref_title = document.createElement('span');
                    var ref_data = document.createElement('span');
                    ref_title.innerHTML = 'Référence : ';
                    ref_title.className = 'enregistrement_title';
                    ref_data.innerHTML = element['reference'];
                    ref_data.className = 'enregistrement_data';
                    parag_ref.appendChild(ref_title);
                    parag_ref.appendChild(ref_data);

                    var parag_qualite = document.createElement('p');
                    var qualite_title = document.createElement('span');
                    var qualite_data = document.createElement('span');
                    qualite_title.innerHTML = 'Qualité : ';
                    qualite_title.className = 'enregistrement_title';
                    qualite_data.innerHTML = element['qualite'] + '/10';
                    qualite_data.className = 'enregistrement_data';
                    parag_qualite.appendChild(qualite_title);
                    parag_qualite.appendChild(qualite_data);

                    zone_info.appendChild(parag_president);
                    zone_info.appendChild(parag_date);
                    zone_info.appendChild(parag_duree);
                    zone_info.appendChild(parag_ref);
                    zone_info.appendChild(parag_qualite);
                };
                k7_div.appendChild(k7_img);
                if (count == number_per_col) {
                    graph.appendChild(k7_div);
                    k7_div = document.createElement('div');
                    count = 0;
                }
            });
            sliderInit();
        });
}

// Récupération des infos sur les réunions
function graph_update_reunion() {
    fetch('data/reunions')
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function (json) {
            console.log('json');
            var graph = document.querySelector('#graph_k7');
            var k7_div = document.createElement('div');
            var largeur_k7 = 2;
            var hauteur_k7 = 4.5;
            var number_per_col = Math.trunc(graph.offsetHeight / Math.trunc(window.innerHeight * (hauteur_k7 / 100)));
            var number_of_col = Math.trunc(graph.offsetWidth / Math.trunc(window.innerWidth * (largeur_k7 / 100)))
            var count = 0;

            function sliderInit() {
                $('#graph_k7').slick({
                    slidesToShow: number_of_col,
                    slidesToScroll: number_of_col,
                    infinite: false
                });
            };

            json.audios.forEach(element => {
                count++;
                var k7_img = document.createElement('img');
                k7_img.setAttribute('src', 'img/k7_vierge.svg');
                k7_img.style.width = largeur_k7 + 'vw';
                k7_img.style.height = hauteur_k7 + 'vh';
                k7_img.onclick = function () {
                    var zone_info = document.querySelector('#enregistrement_info');
                    while (zone_info.firstChild) {
                        zone_info.removeChild(zone_info.firstChild);
                    }

                    var parag_president = document.createElement('p');
                    var president_title = document.createElement('span');
                    var president_data = document.createElement('span');
                    president_title.innerHTML = 'Président : ';
                    president_title.className = 'enregistrement_title';
                    president_data.innerHTML = element['president'];
                    president_data.className = 'enregistrement_data';
                    parag_president.appendChild(president_title);
                    parag_president.appendChild(president_data);

                    var parag_date = document.createElement('p');
                    var date_title = document.createElement('span');
                    var date_data = document.createElement('span');
                    date_title.innerHTML = 'Date : ';
                    date_title.className = 'enregistrement_title';
                    date_data.innerHTML = element['date_general'];
                    date_data.className = 'enregistrement_data';
                    parag_date.appendChild(date_title);
                    parag_date.appendChild(date_data);

                    var parag_duree = document.createElement('p');
                    var duree_title = document.createElement('span');
                    var duree_data = document.createElement('span');
                    duree_title.innerHTML = 'Durée : ';
                    duree_title.className = 'enregistrement_title';
                    duree_data.innerHTML = element['duree']['heure'] + ':' + element['duree']['minute'] + ':' + element['duree']['seconde'];
                    duree_data.className = 'enregistrement_data';
                    parag_duree.appendChild(duree_title);
                    parag_duree.appendChild(duree_data);

                    var parag_ref = document.createElement('p');
                    var ref_title = document.createElement('span');
                    var ref_data = document.createElement('span');
                    ref_title.innerHTML = 'Référence : ';
                    ref_title.className = 'enregistrement_title';
                    ref_data.innerHTML = element['reference'];
                    ref_data.className = 'enregistrement_data';
                    parag_ref.appendChild(ref_title);
                    parag_ref.appendChild(ref_data);

                    var parag_qualite = document.createElement('p');
                    var qualite_title = document.createElement('span');
                    var qualite_data = document.createElement('span');
                    qualite_title.innerHTML = 'Qualité : ';
                    qualite_title.className = 'enregistrement_title';
                    qualite_data.innerHTML = element['qualite'] + '/10';
                    qualite_data.className = 'enregistrement_data';
                    parag_qualite.appendChild(qualite_title);
                    parag_qualite.appendChild(qualite_data);

                    zone_info.appendChild(parag_president);
                    zone_info.appendChild(parag_date);
                    zone_info.appendChild(parag_duree);
                    zone_info.appendChild(parag_ref);
                    zone_info.appendChild(parag_qualite);
                };
                k7_div.appendChild(k7_img);
                if (count == number_per_col) {
                    graph.appendChild(k7_div);
                    k7_div = document.createElement('div');
                    count = 0;
                }
            });
            sliderInit();
        });
}

function graph_audio_reunion(id) {
    var graph_k7 = document.querySelector('#graph_k7');
    while (graph_k7.firstChild) {
        graph_k7.removeChild(graph_k7.firstChild);
    }
    graph_k7.className = "";

    var cb_audio = document.querySelector('#cb_audio');
    var cb_reunion = document.querySelector('#cb_reunion');
    if (cb_audio.checked == true && id == "cb_audio") {
        cb_reunion.checked = false;
    }
    
    if (cb_reunion.checked == true && id == "cb_reunion") {
        console.log("cb_audio.checke")
        cb_audio.checked = false;
    }

    if (cb_audio.checked == true) {
        graph_update_audio();
    }

    if (cb_reunion.checked == true) {
        graph_update_reunion();
    }
}

graph_update_audio();