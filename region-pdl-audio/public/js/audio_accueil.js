var audio = document.getElementById('audio_accueil'); // id for audio element
var duration = audio.duration; // Duration of audio clip, calculated here for embedding purposes
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
    .pause(1000)
    .type('.')
    .pause(1000)
    .type('.')
    .pause(1000)
    .type('.')
    .pause(800)
    .type(" La séance est ouverte »");

audio.addEventListener("pause", function () {
    // remove pause, add play
    pButton.className = "";
    pButton.className = "play";
    typewriter.freeze();
});

audio.addEventListener("play", function () {
    // remove play, add pause
    if (audio.currentTime == 0) {
        typewriter.reset();
        typewriter.go();
    }
    pButton.className = "";
    pButton.className = "pause";
    typewriter.unfreeze();
});

// play button event listenter
pButton.addEventListener("click", play);

// timeupdate event listener
audio.addEventListener("timeupdate", timeUpdate, false);
/*
// makes timeline clickable
timeline.addEventListener("click", function (event) {
    moveplayhead(event);
    audio.currentTime = duration * clickPercent(event);
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
    audio.removeEventListener('timeupdate', timeUpdate, false);
}

// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(event) {
    if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        audio.currentTime = duration * clickPercent(event);
        audio.addEventListener('timeupdate', timeUpdate, false);
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
    var playPercent = timelineWidth * (audio.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    if (audio.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
    }
    currentTime.textContent = formatTime(audio.currentTime);
}

function formatTime(time) {
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);
    return min + ':' + ((sec < 10) ? ('0' + sec) : sec);
}

//Play and Pause
function play() {
    // start audio
    if (audio.paused) {
        audio.play();
    } else { // pause audio
        audio.pause();
    }
}

// Gets audio file duration
audio.addEventListener("canplaythrough", function () {
    duration = audio.duration;
    currentTime.textContent = formatTime(audio.currentTime);
    totalTime.textContent = formatTime(duration);
}, false);

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}