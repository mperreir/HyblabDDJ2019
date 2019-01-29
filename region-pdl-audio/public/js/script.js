'use strict';

// No need for window.onload event here since we are using the def attribute
// when loading our scripts

$(document).ready(function () {
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
});

$('.arrowUp').click(function () {
    $.fn.fullpage.moveSectionUp();
});

$('.arrowDown').click(function () {
    $.fn.fullpage.moveSectionDown();
});


var music = document.getElementById('music'); // id for audio element
var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
var pButton = document.getElementById('pButton'); // play button
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline
var currentTime = document.getElementById('current-time'); // currentime
var totalTime = document.getElementById('total-time');

var typewriter = new TypeIt('#discours', {
    speed: 65,
    startDelay: 1300
})
    .type("« Est-ce que vous seriez assez aimables")
    .break()
    .type("de bien vouloir vous asseoir ?")
    .break()
    .pause(4000)
    .type("… La séance est ouverte »")
    .go();

music.addEventListener("pause", function () {
    // remove pause, add play
    pButton.className = "";
    pButton.className = "play";
    typewriter.freeze();
});

music.addEventListener("play", function () {
    // remove play, add pause
    if (music.currentTime == 0){
        typewriter.reset();
        typewriter.go();
    }
    pButton.className = "";
    pButton.className = "pause";
    typewriter.unfreeze();
})

music.addEventListener("abord", function () {
    console.log('azeaze')
})

// play button event listenter
pButton.addEventListener("click", play);

// timeupdate event listener
music.addEventListener("timeupdate", timeUpdate, false);
/*
// makes timeline clickable
timeline.addEventListener("click", function (event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    // timeline width adjusted for playhead
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    return (event.clientX - getPosition(timeline)) / timelineWidth;
}

// makes playhead draggable
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that audio position is updated only when the playhead is released
var onplayhead = false;

// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}

// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(event) {
    if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(event);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);
    // timeline width adjusted for playhead
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
}
*/
// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
    // timeline width adjusted for playhead
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
    }
    currentTime.textContent = formatTime(music.currentTime);
}

function formatTime(time) {
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);
    return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
}

//Play and Pause
function play() {
    // start music
    if (music.paused) {
        music.play();
    } else { // pause music
        music.pause();
    }
}

// Gets audio file duration
music.addEventListener("canplaythrough", function () {
    duration = music.duration;
    currentTime.textContent = formatTime(music.currentTime);
    totalTime.textContent = formatTime(duration);
}, false);

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}


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