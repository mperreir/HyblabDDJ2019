$("#before_after_images").mouseup(function(){
  if ($("div.twentytwenty-handle").position().left < 100){
    var a = "img/fm_spécialisations.png";
    document.getElementById("differences").src = a;
  }else if ($("div.twentytwenty-handle").position().left > 300) {
    var b = "img/rnt_spécialisations.png";
    document.getElementById("differences").src = b;
  }
});
