var player1 = document.querySelector('#video1');
var player2 = document.querySelector('#video2');

function videoEnded() {
  var video1 = document.getElementById("video1");
  video1.currentTime = 0;
  video1.play();
  video1.style.display = 'none';
}

//html :
<p>Here is some data from a json file : <span id="data"></span><p>

//video2.style.visibility = "visible";

// Load a dummy json file using the fetch API
fetch('data/dummy.json')
    // this promise will be fulfilled when the json fill will be
    .then(function (response){
        // if we could load the resource, parse it
        if( response.ok )
            return response.json();
        else // if not, send some error message as JSON data
            return {data: "JSON file not found"};

    })
    // in case of invalid JSON (parse error) send some error message as JSON data
    .catch( function (error){
        return {data: "Invalid JSON"};
    })
    // this promise will be fulfilled when the json will be parsed
    .then(function (json) {
        document.querySelector('#data')
            .textContent = json.data;
    });
