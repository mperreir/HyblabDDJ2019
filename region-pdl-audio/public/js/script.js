'use strict';

// No need for window.onload event here since we are using the def attribute
// when loading our scripts
var selected_period_reunion = 0;
var selected_period_type_reunion = [false, false, false];
var k7_audio_played = [-1, -1, -1];
var selected_period_theme_reunion = [true, false, false];

$('#fullpage').fullpage({
    scrollingSpeed: 1000,
    anchors: ['1stPage', '2ndPage', '3rdPage', '4thPage', '5thPage', '6thPage', '7thPage'],
    sectionsColor: ['#FFFFFF', '#DA705B', '#FFFFFF', '#FFFFFF', '#FFFFFFF', '#FFFFFF', '#135786'],
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

        if (nextInd == 7) {
            var arrowDown = document.querySelector('.arrowDown');
            arrowDown.style.visibility = 'hidden';
        }
        if (ind == 7) {
            var arrowDown = document.querySelector('.arrowDown');
            arrowDown.style.visibility = 'visible';
        }
    }
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
        document.querySelectorAll('.nb_fichier_audio').forEach(element => {
            element.textContent = json.nb_fichier_audio;
        });
        document.querySelectorAll('.nb_reunion').forEach(element => {
            element.textContent = json.nb_reunion;
        });
        document.querySelectorAll('.date_min').forEach(element => {
            element.textContent = json.date_min;
        });
        document.querySelectorAll('.date_max').forEach(element => {
            element.textContent = json.date_max;
        });
        document.querySelectorAll('.duree_audio').forEach(element => {
            element.textContent = json.heures * 60 + json.minutes;
        });
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
            var largeur_k7 = 2.6;
            var hauteur_k7 = 3.3;
            var number_per_col = Math.trunc(graph.offsetHeight / Math.trunc(window.innerHeight * (hauteur_k7 / 100)));
            var number_of_col = Math.trunc(graph.offsetWidth / Math.trunc(window.innerWidth * (largeur_k7 / 100)));
            var count = 0;
            var id_k7 = 0;

            function sliderInit() {
                $('#graph_k7').slick({
                    slidesToShow: number_of_col,
                    slidesToScroll: number_of_col,
                    infinite: false
                });
            };

            json.audios.forEach(element => {
                count++;
                id_k7++;
                var k7_img = document.createElement('img');
                var usabled = true;
                var periode = 0;

                if (element['annee'] >= 1974 && element['annee'] < 1986) {
                    periode = 0;
                    k7_img.setAttribute('src', 'img/k7_periode_1.svg');
                    if (!(selected_period_reunion == 0 || selected_period_reunion == 1)) {
                        k7_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] >= 1986 && element['annee'] < 1992) {
                    periode = 1;
                    k7_img.setAttribute('src', 'img/k7_periode_2.svg');
                    if (!(selected_period_reunion == 0 || selected_period_reunion == 2)) {
                        k7_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] >= 1992 && element['annee'] <= 1994) {
                    periode = 2;
                    k7_img.setAttribute('src', 'img/k7_periode_3.svg');
                    if (!(selected_period_reunion == 0 || selected_period_reunion == 3)) {
                        k7_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] == 'inconnue') {
                    periode = 3;
                    k7_img.setAttribute('src', 'img/k7_periode_nr.svg');
                    if (!(selected_period_reunion == 0 || selected_period_reunion == 4)) {
                        k7_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }

                k7_img.style.width = largeur_k7 + 'vw';
                k7_img.style.height = hauteur_k7 + 'vh';
                if (usabled) {
                    k7_img.className = 'k7_hover';
                    k7_img.id = 'k7_num_' + id_k7;
                    k7_img.onmouseenter = function () {
                        this.timer = setInterval(function () {
                            if (k7_audio_played[1] != k7_img.id) {

                                if (periode == 0) {
                                    k7_img.setAttribute('src', 'img/k7_periode_1_play.svg');
                                }
                                else if (periode == 1) {
                                    k7_img.setAttribute('src', 'img/k7_periode_2_play.svg');
                                }
                                else if (periode == 2) {
                                    k7_img.setAttribute('src', 'img/k7_periode_3_play.svg');
                                }
                                else if (periode == 3) {
                                    k7_img.setAttribute('src', 'img/k7_periode_nr_play.svg');
                                }
                            }

                            k7_img.onclick = function () {
                                if (k7_audio_played[1] != -1 && k7_audio_played[1] != k7_img.id) {
                                    k7_audio_played[0].setAttribute('src', k7_audio_played[2]);
                                }
                                var new_one = !(k7_audio_played[1] == k7_img.id);
                                k7_audio_played[0] = k7_img;
                                k7_audio_played[1] = k7_img.id;
                                if (periode == 0) {
                                    k7_audio_played[2] = 'img/k7_periode_1.svg';
                                }
                                else if (periode == 1) {
                                    k7_audio_played[2] = 'img/k7_periode_2.svg';
                                }
                                else if (periode == 2) {
                                    k7_audio_played[2] = 'img/k7_periode_3.svg';
                                }
                                else if (periode == 3) {
                                    k7_audio_played[2] = 'img/k7_periode_nr.svg';
                                }

                                var audio = document.querySelector('#audio_k7');
                                var audio_src = document.querySelector('#audio_k7 source');

                                if (new_one) {
                                    audio_src.src = './data/' + element['reference'] + '/' + element['identifiant'];
                                    audio.load();

                                    audio_src.onerror = function () {
                                        audio.pause();
                                    };

                                    audio.play();

                                    if (periode == 0) {
                                        k7_img.setAttribute('src', 'img/k7_periode_1_pause.svg');
                                    }
                                    else if (periode == 1) {
                                        k7_img.setAttribute('src', 'img/k7_periode_2_pause.svg');
                                    }
                                    else if (periode == 2) {
                                        k7_img.setAttribute('src', 'img/k7_periode_3_pause.svg');
                                    }
                                    else if (periode == 3) {
                                        k7_img.setAttribute('src', 'img/k7_periode_nr_pause.svg');
                                    }
                                }
                                else {
                                    audio.pause();
                                    k7_audio_played = [-1, -1, -1];
                                    if (periode == 0) {
                                        k7_img.setAttribute('src', 'img/k7_periode_1_play.svg');
                                    }
                                    else if (periode == 1) {
                                        k7_img.setAttribute('src', 'img/k7_periode_2_play.svg');
                                    }
                                    else if (periode == 2) {
                                        k7_img.setAttribute('src', 'img/k7_periode_3_play.svg');
                                    }
                                    else if (periode == 3) {
                                        k7_img.setAttribute('src', 'img/k7_periode_nr_play.svg');
                                    }
                                }
                            };

                        }, 500);

                        var zone_info = document.querySelector('#enregistrement_info');
                        while (zone_info.firstChild) {
                            zone_info.removeChild(zone_info.firstChild);
                        }

                        var parag_president = document.createElement('p');
                        var president_title = document.createElement('span');
                        var president_data = document.createElement('span');
                        var president_separator = document.createElement('div');
                        president_title.innerHTML = 'Président : ';
                        president_title.className = 'enregistrement_title';
                        president_data.innerHTML = element['president'];
                        president_data.className = 'enregistrement_data';
                        president_separator.className = 'separator_3';
                        parag_president.appendChild(president_title);
                        parag_president.appendChild(president_data);
                        parag_president.appendChild(president_separator);

                        var parag_date = document.createElement('p');
                        var date_title = document.createElement('span');
                        var date_data = document.createElement('span');
                        var date_separator = document.createElement('div');
                        date_title.innerHTML = 'Séance du : ';
                        date_title.className = 'enregistrement_title';
                        date_data.innerHTML = element['date_enregistrement'];
                        date_data.className = 'enregistrement_data';
                        date_separator.className = 'separator_3';
                        parag_date.appendChild(date_title);
                        parag_date.appendChild(date_data);
                        parag_date.appendChild(date_separator);

                        var parag_duree = document.createElement('p');
                        var duree_title = document.createElement('span');
                        var duree_data = document.createElement('span');
                        var duree_separator = document.createElement('div');
                        duree_title.innerHTML = 'Durée : ';
                        duree_title.className = 'enregistrement_title';
                        duree_data.innerHTML = element['duree']['heure'] + ':' + element['duree']['minute'] + ':' + element['duree']['seconde'];
                        duree_data.className = 'enregistrement_data';
                        duree_separator.className = 'separator_3';
                        parag_duree.appendChild(duree_title);
                        parag_duree.appendChild(duree_data);
                        parag_duree.appendChild(duree_separator);

                        var parag_ref = document.createElement('p');
                        var ref_title = document.createElement('span');
                        var ref_data = document.createElement('span');
                        var ref_separator = document.createElement('div');
                        ref_title.innerHTML = 'Référence : ';
                        ref_title.className = 'enregistrement_title';
                        ref_data.innerHTML = element['reference'];
                        ref_data.className = 'enregistrement_data';
                        ref_separator.className = 'separator_3';
                        parag_ref.appendChild(ref_title);
                        parag_ref.appendChild(ref_data);
                        parag_ref.appendChild(ref_separator);

                        var parag_qualite = document.createElement('p');
                        var qualite_title = document.createElement('span');
                        var qualite_data = document.createElement('span');
                        var qualite_separator = document.createElement('div');
                        qualite_title.innerHTML = 'Qualité : ';
                        qualite_title.className = 'enregistrement_title';
                        qualite_data.innerHTML = element['qualite'] + '/10';
                        qualite_data.className = 'enregistrement_data';
                        qualite_separator.className = 'separator_3';
                        parag_qualite.appendChild(qualite_title);
                        parag_qualite.appendChild(qualite_data);
                        parag_qualite.appendChild(qualite_separator);

                        zone_info.appendChild(parag_date);
                        zone_info.appendChild(parag_president);
                        zone_info.appendChild(parag_duree);
                        zone_info.appendChild(parag_ref);
                        zone_info.appendChild(parag_qualite);
                    };
                    k7_img.onmouseleave = function () {
                        var zone_info = document.querySelector('#enregistrement_info');
                        while (zone_info.firstChild) {
                            zone_info.removeChild(zone_info.firstChild);
                        }
                        this.timer && clearInterval(this.timer);

                        var audio = document.querySelector('#audio_k7');
                        if (audio.paused) {
                            if (periode == 0) {
                                k7_img.setAttribute('src', 'img/k7_periode_1.svg');
                            }
                            else if (periode == 1) {
                                k7_img.setAttribute('src', 'img/k7_periode_2.svg');
                            }
                            else if (periode == 2) {
                                k7_img.setAttribute('src', 'img/k7_periode_3.svg');
                            }
                            else if (periode == 3) {
                                k7_img.setAttribute('src', 'img/k7_periode_nr.svg');
                            }
                        }
                        else {
                            if (k7_audio_played[1] != k7_img.id) {

                                if (periode == 0) {
                                    k7_img.setAttribute('src', 'img/k7_periode_1.svg');
                                }
                                else if (periode == 1) {
                                    k7_img.setAttribute('src', 'img/k7_periode_2.svg');
                                }
                                else if (periode == 2) {
                                    k7_img.setAttribute('src', 'img/k7_periode_3.svg');
                                }
                                else if (periode == 3) {
                                    k7_img.setAttribute('src', 'img/k7_periode_nr.svg');
                                }
                            }
                        }
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
                    if (!(selected_period_reunion == 0 || selected_period_reunion == 1)) {
                        micro_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] >= 1986 && element['annee'] < 1992) {
                    micro_img.setAttribute('src', 'img/micro_periode_2.svg');
                    if (!(selected_period_reunion == 0 || selected_period_reunion == 2)) {
                        micro_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] >= 1992 && element['annee'] <= 1994) {
                    micro_img.setAttribute('src', 'img/micro_periode_3.svg');
                    if (!(selected_period_reunion == 0 || selected_period_reunion == 3)) {
                        micro_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }
                else if (element['annee'] == 'inconnue') {
                    micro_img.setAttribute('src', 'img/micro_periode_nr.svg');
                    if (!(selected_period_reunion == 0 || selected_period_reunion == 4)) {
                        micro_img.style.opacity = 0.3;
                        usabled = false;
                    }
                }

                micro_img.style.width = largeur_micro + 'vw';
                micro_img.style.height = hauteur_micro + 'vh';
                micro_img.style.marginBottom = margin_bottom + 'vh';
                if (usabled) {
                    micro_img.className = "micro_hover";
                    micro_img.onmouseenter = function () {
                        var zone_info = document.querySelector('#enregistrement_info');
                        while (zone_info.firstChild) {
                            zone_info.removeChild(zone_info.firstChild);
                        }

                        var parag_president = document.createElement('p');
                        var president_title = document.createElement('span');
                        var president_data = document.createElement('span');
                        var president_separator = document.createElement('div');
                        president_title.innerHTML = 'Président : ';
                        president_title.className = 'enregistrement_title';
                        president_data.innerHTML = element['president'];
                        president_data.className = 'enregistrement_data';
                        president_separator.className = 'separator_3';
                        parag_president.appendChild(president_title);
                        parag_president.appendChild(president_data);
                        parag_president.appendChild(president_separator);

                        var parag_date = document.createElement('p');
                        var date_title = document.createElement('span');
                        var date_data = document.createElement('span');
                        var date_separator = document.createElement('div');
                        date_title.innerHTML = 'Séance : ';
                        date_title.className = 'enregistrement_title';
                        date_data.innerHTML = element['date'];
                        date_data.className = 'enregistrement_data';
                        date_separator.className = 'separator_3';
                        parag_date.appendChild(date_title);
                        parag_date.appendChild(date_data);
                        parag_date.appendChild(date_separator);

                        var parag_objet = document.createElement('p');
                        var objet_title = document.createElement('span');
                        var objet_data = document.createElement('span');
                        var objet_separator = document.createElement('div');
                        objet_title.innerHTML = 'Objet : ';
                        objet_title.className = 'enregistrement_title';
                        objet_data.innerHTML = element['objet_general'];
                        objet_data.className = 'enregistrement_data';
                        objet_separator.className = 'separator_3';
                        parag_objet.appendChild(objet_title);
                        parag_objet.appendChild(objet_data);
                        parag_objet.appendChild(objet_separator);

                        var parag_nb_audio = document.createElement('p');
                        var nb_audio_title = document.createElement('span');
                        var nb_audio_data = document.createElement('span');
                        var nb_audio_separator = document.createElement('div');
                        nb_audio_title.innerHTML = "Nombre d'audios : ";
                        nb_audio_title.className = 'enregistrement_title';
                        nb_audio_data.innerHTML = element['nb_audio'];
                        nb_audio_data.className = 'enregistrement_data';
                        nb_audio_separator.className = 'separator_3';
                        parag_nb_audio.appendChild(nb_audio_title);
                        parag_nb_audio.appendChild(nb_audio_data);
                        parag_nb_audio.appendChild(nb_audio_separator);

                        var parag_duree = document.createElement('p');
                        var duree_title = document.createElement('span');
                        var duree_data = document.createElement('span');
                        var duree_separator = document.createElement('div');
                        duree_title.innerHTML = 'Durée : ';
                        duree_title.className = 'enregistrement_title';
                        duree_data.innerHTML = element['duree']['heure'] + ':' + element['duree']['minute'].toString().padStart(2, '0') + ':' + element['duree']['seconde'].toString().padStart(2, '0');
                        duree_data.className = 'enregistrement_data';
                        duree_separator.className = 'separator_3';
                        parag_duree.appendChild(duree_title);
                        parag_duree.appendChild(duree_data);
                        parag_duree.appendChild(duree_separator);

                        zone_info.appendChild(parag_date);
                        zone_info.appendChild(parag_president);
                        zone_info.appendChild(parag_objet);
                        zone_info.appendChild(parag_nb_audio);
                        zone_info.appendChild(parag_duree);
                    };
                    micro_img.onmouseleave = function () {
                        var zone_info = document.querySelector('#enregistrement_info');
                        while (zone_info.firstChild) {
                            zone_info.removeChild(zone_info.firstChild);
                        }
                    }
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


    /*var cb_audio = document.querySelector('#cb_audio');
    var cb_reunion = document.querySelector('#cb_reunion');
    if (cb_audio.checked == true && id == "cb_audio") {
        cb_reunion.checked = false;
    }

    if (cb_reunion.checked == true && id == "cb_reunion") {
        cb_audio.checked = false;
    }*/

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
        selected_period_reunion = 1;
    }
    else if (id == 'periode_2') {
        selected_period_reunion = 2;
    }
    else if (id == 'periode_3') {
        selected_period_reunion = 3;
    }
    else if (id == 'periode_nr') {
        selected_period_reunion = 4;
    }
    else if (id == 'periode_all') {
        selected_period_reunion = 0;
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
            button_audio.src = 'img/pause_white.svg'
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
            button_audio.src = 'img/pause_white.svg'
        });

        if (audio_vincent.paused) {
            audio_vincent.play();
            audio_olivier.pause();
        } else {
            audio_vincent.pause();
        }
    }
}


function generateBarGraph(wrapper) {
    // Set Up Values Array
    var values = [];

    // Get Values and save to Array
    $(wrapper + ' .bar').each(function (index, el) {
        values.push($(this).data('value'));
    });

    // Get Max Value From Array
    var max_value = Math.max.apply(Math, values);

    // Set width of bar to percent of max value
    $(wrapper + ' .row').each(function (index, el) {

        var bar = this.querySelector('.bar'),
            value = bar.getAttribute('data-value'),
            percent = Math.ceil((value / max_value) * 100);

        // Set Width & Add Class
        bar.style.width = (percent + '%');
        bar.className += ' in';

        var number = this.querySelector('.number');
        number.style.left = percent + '%';
    });

}

// Récupération des infos sur les réunions
function graph_update_type_reunion() {
    fetch('data/type_reunions')
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function (json) {
            var data = {};
            var nb_type = 0;
            if (selected_period_type_reunion[0]) {
                nb_type += json.periode_1['nb_reunion'];
                for (var key in json.periode_1['objet']) {
                    if (data[key] === undefined) {
                        data[key] = 0;
                    }
                    data[key] += json.periode_1['objet'][key];
                }
            }
            if (selected_period_type_reunion[1]) {
                nb_type += json.periode_2['nb_reunion'];
                for (var key in json.periode_2['objet']) {
                    if (data[key] === undefined) {
                        data[key] = 0;
                    }
                    data[key] += json.periode_2['objet'][key];
                }
            }
            if (selected_period_type_reunion[2]) {
                nb_type += json.periode_3['nb_reunion'];
                for (var key in json.periode_3['objet']) {
                    if (data[key] === undefined) {
                        data[key] = 0;
                    }
                    data[key] += json.periode_3['objet'][key];
                }
            }

            var parent = document.querySelector('#dashboard-stats');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }

            for (var key in data) {
                var div_row = document.createElement('div');
                var span_label = document.createElement('span');
                var div_bar_wrap = document.createElement('div');
                var div_bar = document.createElement('div');
                var span_number = document.createElement('span');

                div_row.className = 'row';
                span_label.className = 'label';
                span_label.innerHTML = key;
                div_bar_wrap.className = 'bar-wrap';
                div_bar.className = "bar";
                div_bar.setAttribute('data-value', data[key]);
                span_number.className = 'number';
                span_number.innerHTML = Math.trunc(data[key] / nb_type * 100) + ' %';

                if (key.toLowerCase().includes('installation')) {
                    div_bar.className += " bar_char_installation";
                    span_number.className += " number_installation";
                }
                else if (key.toLowerCase().includes('budget')) {
                    div_bar.className += " bar_char_budget";
                    span_number.className += " number_budget";
                }
                else if (key.toLowerCase().includes('séance')) {
                    div_bar.className += " bar_char_seance";
                    span_number.className += " number_seance";
                }
                else if (key.toLowerCase().includes('décision')) {
                    div_bar.className += " bar_char_decision";
                    span_number.className += " number_decision";
                }
                else {
                    div_bar.className += " bar_char_nr";
                    span_number.className += " number_nr";
                }

                div_bar_wrap.appendChild(span_number);
                div_bar_wrap.appendChild(div_bar);
                div_row.appendChild(div_bar_wrap);
                div_row.appendChild(span_label);
                parent.appendChild(div_row);
                generateBarGraph('#dashboard-stats');
            }
        });
}

function graph_type_reunion_filter(id) {
    var index = -1;
    if (id == 'micro_reunion_bouton_periode_1') {
        selected_period_type_reunion[0] = !selected_period_type_reunion[0];
        index = 0;
    }
    else if (id == 'micro_reunion_bouton_periode_2') {
        selected_period_type_reunion[1] = !selected_period_type_reunion[1];
        index = 1;
    }
    else if (id == 'micro_reunion_bouton_periode_3') {
        selected_period_type_reunion[2] = !selected_period_type_reunion[2];
        index = 2;
    }

    var image = document.querySelector('#' + id);
    if (selected_period_type_reunion[index]) {
        image.src = 'img/bouton_micro_on.svg';
    }
    else {
        image.src = 'img/bouton_micro_off.svg';
    }
    graph_update_type_reunion();
}

function info_president_display(id) {
    var element = '';
    if (id == 'bobine_olivier') {
        element = document.querySelector('#info_olivier');
    }
    else if (id == 'bobine_vincent') {
        element = document.querySelector('#info_vincent');
    }
    element.style.display = 'block';
}

function info_president_undisplay(id) {
    var element = '';
    if (id == 'bobine_olivier') {
        element = document.querySelector('#info_olivier');
    }
    else if (id == 'bobine_vincent') {
        element = document.querySelector('#info_vincent');
    }
    element.style.display = 'none';
}

function graph_update_theme() {
    fetch('data/themes')
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function (json) {
            console.log(json);
            var theme = [
                'action_culturelle',
                'agriculture',
                'amenagement_eau',
                'conchyculture',
                'enseignement',
                'environnement',
                'formation_professionnelle',
                'logement',
                'tourisme',
                'transport',
                'nr'
            ];

            var theme_name = {
                'action_culturelle': 'Action culturelle',
                'agriculture': 'Agriculture',
                'amenagement_eau': 'Aménagement des eaux',
                'conchyculture': 'Conchyculture',
                'enseignement': 'Enseignement',
                'environnement': 'Environnement',
                'formation_professionnelle': 'Formation professionnelle',
                'logement': 'Logement',
                'tourisme': 'Tourisme',
                'transport': 'Transport',
                'nr': 'Non renseigné'
            }
            var parent = document.querySelector('#graph_theme');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }

            var figure = document.createElement('figure');
            var img_periode_1 = document.createElement('img');
            var img_periode_2 = document.createElement('img');
            var img_periode_3 = document.createElement('img');

            img_periode_1.id = 'bobine_theme_periode_1';
            img_periode_1.src = 'img/bobine_theme_periode_1.svg';
            img_periode_1.alt = 'Bobine';
            img_periode_1.onclick = function () {
                selected_period_theme_reunion[0] = !selected_period_theme_reunion[0];
                graph_update_theme_show(0);
            };

            img_periode_2.id = 'bobine_theme_periode_2';
            img_periode_2.src = 'img/bobine_theme_periode_2.svg';
            img_periode_2.alt = 'Bobine';
            img_periode_2.onclick = function () {
                selected_period_theme_reunion[1] = !selected_period_theme_reunion[1];
                graph_update_theme_show(1);
            };

            img_periode_3.id = 'bobine_theme_periode_3';
            img_periode_3.src = 'img/bobine_theme_periode_3.svg';
            img_periode_3.alt = 'Bobine';
            img_periode_3.onclick = function () {
                selected_period_theme_reunion[2] = !selected_period_theme_reunion[2];
                graph_update_theme_show(2);
            };

            var ul_legend = document.createElement('ul');
            ul_legend.id = 'legend_cumulative';
            theme.forEach(element => {
                var li = document.createElement('li')
                li.innerHTML = theme_name[element];
                ul_legend.appendChild(li);
            });

            if (selected_period_theme_reunion[0] || selected_period_theme_reunion[1] || selected_period_theme_reunion[2]) {
                var div_graphic = document.createElement('div');
                div_graphic.className = 'graphic_cumulative';

                var div_row = document.createElement('div');
                var div_chart = document.createElement('div');
                var pourcentage_total = 0;
                theme.forEach(element => {
                    pourcentage_total += Math.round((json.periode_1.theme[element] / json.periode_1.nb_theme) * 100);
                });
                theme.forEach(element => {
                    var span_block = document.createElement('span');
                    var span_value = document.createElement('span');

                    span_value.className = 'value_cumulative';
                    span_value.innerHTML = (Math.round(json.periode_1.theme[element] / json.periode_1.nb_theme * 100) / pourcentage_total * 100) + '%';
                    span_block.className = 'block_cumulative';
                    span_block.setAttribute('title', json.periode_1.theme[element] + ' réunions');
                    div_chart.className = 'chart_cumulative';
                    div_chart.id = 'chart_cumulative_num_0';
                    div_row.className = 'row_cumulative';

                    span_block.appendChild(span_value);
                    div_chart.appendChild(span_block);

                });
                div_row.appendChild(div_chart);
                div_graphic.appendChild(div_row);

                var div_row = document.createElement('div');
                var div_chart = document.createElement('div');
                var pourcentage_total = 0;
                theme.forEach(element => {
                    pourcentage_total += Math.round((json.periode_2.theme[element] / json.periode_2.nb_theme) * 100);
                });
                theme.forEach(element => {

                    var span_block = document.createElement('span');
                    var span_value = document.createElement('span');

                    span_value.className = 'value_cumulative';
                    span_value.innerHTML = (Math.round(json.periode_2.theme[element] / json.periode_2.nb_theme * 100) / pourcentage_total * 100) + '%';
                    span_block.className = 'block_cumulative';
                    span_block.setAttribute('title', json.periode_2.theme[element] + ' réunions');
                    div_chart.className = 'chart_cumulative';
                    div_chart.id = 'chart_cumulative_num_1';
                    div_row.className = 'row_cumulative';

                    span_block.appendChild(span_value);
                    div_chart.appendChild(span_block);

                });
                div_row.appendChild(div_chart);
                div_graphic.appendChild(div_row);

                var div_row = document.createElement('div');
                var div_chart = document.createElement('div');
                var pourcentage_total = 0;
                theme.forEach(element => {
                    pourcentage_total += Math.round((json.periode_3.theme[element] / json.periode_3.nb_theme) * 100);
                });
                theme.forEach(element => {

                    var span_block = document.createElement('span');
                    var span_value = document.createElement('span');

                    span_value.className = 'value_cumulative';
                    span_value.innerHTML = (Math.round(json.periode_3.theme[element] / json.periode_3.nb_theme * 100) / pourcentage_total * 100) + '%';
                    span_block.className = 'block_cumulative';
                    span_block.setAttribute('title', json.periode_3.theme[element] + ' réunions');
                    div_chart.className = 'chart_cumulative';
                    div_chart.id = 'chart_cumulative_num_2';
                    div_row.className = 'row_cumulative';

                    span_block.appendChild(span_value);
                    div_chart.appendChild(span_block);

                });
                div_row.appendChild(div_chart);
                div_graphic.appendChild(div_row);
                figure.appendChild(div_graphic);
            }
            parent.appendChild(img_periode_1);
            parent.appendChild(img_periode_2);
            parent.appendChild(img_periode_3);
            parent.appendChild(figure);
            parent.appendChild(ul_legend);

            $('.value_cumulative').each(function () {
                var text = $(this).text();
                $(this).parent().css('width', text);
            });

            $('.block_cumulative').tooltip({
                position: {
                    my: "center bottom",
                    at: "center top"
                }
            });
            graph_update_theme_show(0);
            graph_update_theme_show(1);
            graph_update_theme_show(2);

        });
}

function graph_update_theme_show(id) {
    if (selected_period_theme_reunion[id]) {
        $('#chart_cumulative_num_' + id).css('-webkit-animation', 'expand 1.5s ease forwards');
    }
    else {
        if ($('#chart_cumulative_num_' + id).width() != 0) {
            $('#chart_cumulative_num_' + id).css('-webkit-animation', 'contract 1.5s ease forwards');
        }
    }
}

function gestion_audio_debut() {
    var audio_begin = document.getElementById('audio_accueil'); // id for audio element
    var duration_begin = audio_begin.duration; // Duration of audio clip, calculated here for embedding purposes
    var pButton_begin = document.getElementById('pButton'); // play button
    var playhead_begin = document.getElementById('playhead'); // playhead
    var timeline_begin = document.getElementById('timeline'); // timeline
    var currentTime_begin = document.getElementById('current-time'); // currentime
    var totalTime_begin = document.getElementById('total-time');

    var typewriter = new TypeIt('#discours', {
        speed: 65,
        startDelay: 1300
    })
        .type("« Est-ce que vous seriez assez aimables")
        .break()
        .type("de bien vouloir vous asseoir ?")
        .break()
        .pause(1000)
        .type('.')
        .pause(1000)
        .type('.')
        .pause(1000)
        .type('.')
        .pause(800)
        .type(" La séance est ouverte »");

    audio_begin.addEventListener("pause", function () {
        // remove pause, add play
        pButton_begin.className = "";
        pButton_begin.className = "play";
        typewriter.freeze();
    });

    audio_begin.addEventListener("play", function () {
        // remove play, add pause
        if (audio_begin.currentTime == 0) {
            typewriter.reset();
            typewriter.go();
        }
        pButton_begin.className = "";
        pButton_begin.className = "pause";
        typewriter.unfreeze();
    });

    // play button event listenter
    pButton_begin.addEventListener("click", play);

    // timeupdate event listener
    audio_begin.addEventListener("timeupdate", timeUpdate, false);
    // timeUpdate
    // Synchronizes playhead position with current point in audio
    function timeUpdate() {
        // timeline width adjusted for playhead
        var timelineWidth = timeline_begin.offsetWidth - playhead_begin.offsetWidth;
        var playPercent = timelineWidth * (audio_begin.currentTime / duration_begin);
        playhead_begin.style.marginLeft = playPercent + "px";
        if (audio_begin.currentTime == duration_begin) {
            pButton_begin.className = "";
            pButton_begin.className = "play";
        }
        currentTime_begin.textContent = formatTime(audio_begin.currentTime);
    }

    function formatTime(time) {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
    }

    //Play and Pause
    function play() {
        // start audio
        if (audio_begin.paused) {
            audio_begin.play();
        } else { // pause audio
            audio_begin.pause();
        }
    }

    // Gets audio file duration
    audio_begin.addEventListener("canplaythrough", function () {
        duration_begin = audio_begin.duration;
        currentTime_begin.textContent = formatTime(audio_begin.currentTime);
        totalTime_begin.textContent = formatTime(duration_begin);
    }, false);
}

function gestion_audio_fin() {
    var audio_end = document.getElementById('audio_fin'); // id for audio element
    var duration_end = audio_end.duration; // Duration of audio clip, calculated here for embedding purposes
    var pButton_end = document.getElementById('pButton_end'); // play button
    var playhead_end = document.getElementById('playhead_end'); // playhead
    var timeline_end = document.getElementById('timeline_end'); // timeline
    var currentTime_end = document.getElementById('current-time_end'); // currentime
    var totalTime_end = document.getElementById('total-time_end');

    audio_end.addEventListener("pause", function () {
        // remove pause, add play
        pButton_end.className = "";
        pButton_end.className = "play";
    });

    audio_end.addEventListener("play", function () {
        pButton_end.className = "";
        pButton_end.className = "pause";
    });

    // play button event listenter
    pButton_end.addEventListener("click", play);

    // timeupdate event listener
    audio_end.addEventListener("timeupdate", timeUpdate, false);

    function timeUpdate() {
        // timeline width adjusted for playhead
        var timelineWidth = timeline_end.offsetWidth - playhead_end.offsetWidth;
        var playPercent = timelineWidth * (audio_end.currentTime / duration_end);
        playhead_end.style.marginLeft = playPercent + "px";
        if (audio_end.currentTime == duration_end) {
            pButton_end.className = "";
            pButton_end.className = "play";
        }
        currentTime_end.textContent = formatTime(audio_end.currentTime);
    }

    function formatTime(time) {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
    }

    //Play and Pause
    function play() {
        // start audio
        if (audio_end.paused) {
            audio_end.play();
        } else { // pause audio
            audio_end.pause();
        }
    }

    // Gets audio file duration
    audio_end.addEventListener("canplaythrough", function () {
        duration_end = audio_end.duration;
        currentTime_end.textContent = formatTime(audio_end.currentTime);
        totalTime_end.textContent = formatTime(duration_end);
    }, false);
}

gestion_audio_debut();
gestion_audio_fin();
graph_update_theme();
graph_update_audio();