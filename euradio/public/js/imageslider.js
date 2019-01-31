$("#before_after_images").mouseup(function(){
  if ($("div.twentytwenty-handle").position().left < 10){
    var nouveau = "AUJOURD'HUI, UNE RADIO LIBRE, GRATUITE, ET ANONYME...";
    document.getElementById("test").innerHTML = nouveau;
  }else if ($("div.twentytwenty-handle").position().left == 504) {
    var nouveau2 = "DEMAIN, UNE RADIO TOUJOURS LIBRE, GRATUITE, ET ANONYME...";
    document.getElementById("test").innerHTML = nouveau2;
  }
});
