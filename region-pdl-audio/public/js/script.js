'use strict';

// No need for window.onload event here since we are using the def attribute
// when loading our scripts
var selected_period = 0;

$('#fullpage').fullpage({
    scrollingSpeed: 750,
    anchors: ['1stPage', '2ndPage', '3rdPage', '4thPage', '5thPage', '6thPage', '7thPage'],
    sectionsColor: ['#FFFFFF', '#DA705B', '#FFFFFF', '#FFFFFF', '#FFFFFFF', '#495368', '#135786'],
    verticalCentered: false,
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['First page', 'Second page', 'Third page', 'Fourth page', 'Fifth page', 'Sixth page', 'Seventh page'],
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
        document.querySelector('#date_min')
            .textContent = json.date_min;
        document.querySelector('#date_max')
            .textContent = json.date_max;
        document.querySelector('#duree_audio')
            .textContent = json.heures * 60 + json.minutes;
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
            var graph = document.querySelector('#graph_k7');
            var k7_div = document.createElement('div');
            var largeur_k7 = 2;
            var hauteur_k7 = 4.5;
            var number_per_col = Math.trunc(graph.offsetHeight / Math.trunc(window.innerHeight * (hauteur_k7 / 100)));
            var number_of_col = Math.trunc(graph.offsetWidth / Math.trunc(window.innerWidth * (largeur_k7 / 100)));
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
                var usabled = true;

                if (element['annee'] >= 1974 && element['annee'] < 1986) {
                    k7_img.setAttribute('src', 'img/k7_periode_1.svg');
                    if (!(selected_period == 0 || selected_period == 1)) {
                        k7_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] >= 1986 && element['annee'] < 1992) {
                    k7_img.setAttribute('src', 'img/k7_periode_2.svg');
                    if (!(selected_period == 0 || selected_period == 2)) {
                        k7_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] >= 1992 && element['annee'] <= 1994) {
                    k7_img.setAttribute('src', 'img/k7_periode_3.svg');
                    if (!(selected_period == 0 || selected_period == 3)) {
                        k7_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] == 'inconnue') {
                    k7_img.setAttribute('src', 'img/k7_periode_nr.svg');
                    if (!(selected_period == 0 || selected_period == 4)) {
                        k7_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }


                k7_img.style.width = largeur_k7 + 'vw';
                k7_img.style.height = hauteur_k7 + 'vh';
                if (usabled) {
                    k7_img.className = "k7_hover";
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
                        date_data.innerHTML = element['date_enregistrement'];
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

                        var button_audio = document.querySelector('#info_audio_button');
                        button_audio.style.visibility = 'visible';

                        var audio = document.querySelector('#audio_k7');
                        var audio_src = document.querySelector('#audio_k7 source');
                        audio_src.src = './data/' + element['reference'] + '/' + element['identifiant'];
                        audio.load();

                        audio.addEventListener("pause", function () {
                            button_audio.className = "";
                            button_audio.className = "play";
                        });

                        audio.addEventListener("play", function () {
                            button_audio.className = "";
                            button_audio.className = "pause";
                        });

                        audio_src.onerror = function () {
                            audio.pause();
                            button_audio.style.visibility = 'hidden';
                        };

                        button_audio.onclick = function () {
                            if (audio.paused) {
                                audio.play();
                            } else {
                                audio.pause();
                            }
                        };

                        audio.play();

                    };
                }

                k7_div.appendChild(k7_img);
                if (count == number_per_col) {
                    graph.appendChild(k7_div);
                    k7_div = document.createElement('div');
                    count = 0;
                }
                graph.appendChild(k7_div);
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
            console.log(json);
            var graph = document.querySelector('#graph_k7');
            var micro_div = document.createElement('div');
            var largeur_micro = 4;
            var hauteur_micro = 7;
            var margin_bottom = 3;
            var number_per_col = Math.trunc(graph.offsetHeight / (Math.trunc(window.innerHeight * (hauteur_micro / 100)) + Math.trunc(window.innerHeight * (margin_bottom / 100))));
            var number_of_col = Math.trunc(graph.offsetWidth / Math.trunc(window.innerWidth * (largeur_micro / 100)));
            var count = 0;

            function sliderInit() {
                $('#graph_k7').slick({
                    slidesToShow: number_of_col,
                    slidesToScroll: number_of_col,
                    infinite: false
                });
            };

            json.reunions.forEach(element => {
                count++;
                var usabled = true;
                var micro_img = document.createElement('img');

                if (element['annee'] >= 1974 && element['annee'] < 1986) {
                    micro_img.setAttribute('src', 'img/micro_periode_1.svg');
                    if (!(selected_period == 0 || selected_period == 1)) {
                        micro_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] >= 1986 && element['annee'] < 1992) {
                    micro_img.setAttribute('src', 'img/micro_periode_2.svg');
                    if (!(selected_period == 0 || selected_period == 2)) {
                        micro_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] >= 1992 && element['annee'] <= 1994) {
                    micro_img.setAttribute('src', 'img/micro_periode_3.svg');
                    if (!(selected_period == 0 || selected_period == 3)) {
                        micro_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] == 'inconnue') {
                    micro_img.setAttribute('src', 'img/micro_periode_nr.svg');
                    if (!(selected_period == 0 || selected_period == 4)) {
                        micro_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }

                micro_img.style.width = largeur_micro + 'vw';
                micro_img.style.height = hauteur_micro + 'vh';
                micro_img.style.marginBottom = margin_bottom + 'vh';
                if (usabled) {
                    micro_img.className = "micro_hover";
                    micro_img.onclick = function () {
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
                        date_data.innerHTML = element['date'];
                        date_data.className = 'enregistrement_data';
                        parag_date.appendChild(date_title);
                        parag_date.appendChild(date_data);

                        var parag_objet = document.createElement('p');
                        var objet_title = document.createElement('span');
                        var objet_data = document.createElement('span');
                        objet_title.innerHTML = 'Objet : ';
                        objet_title.className = 'enregistrement_title';
                        objet_data.innerHTML = element['objet_general'];
                        objet_data.className = 'enregistrement_data';
                        parag_objet.appendChild(objet_title);
                        parag_objet.appendChild(objet_data);

                        var parag_nb_audio = document.createElement('p');
                        var nb_audio_title = document.createElement('span');
                        var nb_audio_data = document.createElement('span');
                        nb_audio_title.innerHTML = "Nombre d'audios : ";
                        nb_audio_title.className = 'enregistrement_title';
                        nb_audio_data.innerHTML = element['nb_audio'];
                        nb_audio_data.className = 'enregistrement_data';
                        parag_nb_audio.appendChild(nb_audio_title);
                        parag_nb_audio.appendChild(nb_audio_data);

                        var parag_duree = document.createElement('p');
                        var duree_title = document.createElement('span');
                        var duree_data = document.createElement('span');
                        duree_title.innerHTML = 'Durée : ';
                        duree_title.className = 'enregistrement_title';
                        duree_data.innerHTML = element['duree']['heure'] + ':' + element['duree']['minute'].toString().padStart(2, '0') + ':' + element['duree']['seconde'].toString().padStart(2, '0');
                        duree_data.className = 'enregistrement_data';
                        parag_duree.appendChild(duree_title);
                        parag_duree.appendChild(duree_data);

                        zone_info.appendChild(parag_president);
                        zone_info.appendChild(parag_date);
                        zone_info.appendChild(parag_objet);
                        zone_info.appendChild(parag_nb_audio);
                        zone_info.appendChild(parag_duree);
                    };
                }
                micro_div.appendChild(micro_img);
                if (count == number_per_col) {
                    graph.appendChild(micro_div);
                    micro_div = document.createElement('div');
                    count = 0;
                }
            });
            graph.appendChild(micro_div);
            sliderInit();
        });
}

function graph_audio_reunion(id) {
    var graph_k7 = document.querySelector('#graph_k7');
    while (graph_k7.firstChild) {
        graph_k7.removeChild(graph_k7.firstChild);
    }
    graph_k7.className = "";

    var zone_info = document.querySelector('#enregistrement_info');
    while (zone_info.firstChild) {
        zone_info.removeChild(zone_info.firstChild);
    }

    var button_audio = document.querySelector('#info_audio_button');
    button_audio.style.visibility = 'hidden';

    var audio = document.querySelector('#audio_k7');
    var audio_src = document.querySelector('#audio_k7 source');
    audio.pause();
    audio_src.src = '';


    var cb_audio = document.querySelector('#cb_audio');
    var cb_reunion = document.querySelector('#cb_reunion');
    if (cb_audio.checked == true && id == "cb_audio") {
        cb_reunion.checked = false;
    }

    if (cb_reunion.checked == true && id == "cb_reunion") {
        cb_audio.checked = false;
    }

    if (cb_audio.checked == true) {
        graph_update_audio();
    }

    if (cb_reunion.checked == true) {
        graph_update_reunion();
    }
}

function graph_audio_reunion_filter(id) {
    var graph_k7 = document.querySelector('#graph_k7');
    while (graph_k7.firstChild) {
        graph_k7.removeChild(graph_k7.firstChild);
    }
    graph_k7.className = "";

    if (id == 'periode_1') {
        selected_period = 1;
    }
    else if (id == 'periode_2') {
        selected_period = 2;
    }
    else if (id == 'periode_3') {
        selected_period = 3;
    }
    else if (id == 'periode_nr') {
        selected_period = 4;
    }
    else if (id == 'periode_all') {
        selected_period = 0;
    }

    if (cb_audio.checked == true) {
        graph_update_audio();
    }

    if (cb_reunion.checked == true) {
        graph_update_reunion();
    }
}

function start_pres_audio(id) {
    var audio_olivier = document.querySelector('#audio_olivier');
    var audio_vincent = document.querySelector('#audio_vincent');

    if (id == "bobine_olivier") {
        var button_audio = document.querySelector('#play_olivier');

        audio_olivier.addEventListener("pause", function () {
            button_audio.src = 'img/play_white.svg'
        });

        audio_olivier.addEventListener("play", function () {
            button_audio.src = 'img/pause.svg'
        });

        if (audio_olivier.paused) {
            audio_olivier.play();
            audio_vincent.pause();
        } else {
            audio_olivier.pause();
        }
    }
    else if (id == "bobine_vincent") {
        var button_audio = document.querySelector('#play_vincent');

        audio_vincent.addEventListener("pause", function () {
            button_audio.src = 'img/play_white.svg'
        });

        audio_vincent.addEventListener("play", function () {
            button_audio.src = 'img/pause.svg'
        });

        if (audio_vincent.paused) {
            audio_vincent.play();
            audio_olivier.pause();
        } else {
            audio_vincent.pause();
        }
    }
}


graph_update_audio();