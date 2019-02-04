$("#before_after_images").mouseup(function(){
  if ($("div.twentytwenty-handle").position().left < 20){
    var a = "img/fm_spécialisations.png";
    document.getElementById("differences").src = a;
  }else if ($("div.twentytwenty-handle").position().left > 390) {
    var b = "img/rnt_spécialisations.png";
    document.getElementById("differences").src = b;
  }
});
