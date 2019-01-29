$('#draggable').draggable({
  axis: "x",
  grid: [ 27, 20 ],
  drag: function( event, ui ) {
    var offset = $(this).offset(); // Avoir les coordonnées du slider
    var xPos = offset.left; //
    changer_radio(xPos);
  },
  containment: "parent"
});

var radios = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed','Al', 'eiusmod','Euradio', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua','Ut','Coucou','On','Continu','jusqu'];

function changer_radio(xPos){
  var position = xPos;
  var valeur = parseInt(((parseInt(xPos) - 547)/27))+7; //Valeur réelle
  $( ".imagesPage1 p" ).text(radios[valeur]);
  console.log((valeur));
  if(valeur >20){
    document.getElementById('imgBackground').src="img/image.png";
    //document.getElementById('imgBackground').marginRight="5px";
    $('#draggable').draggable({
      axis: "x",
      grid: [ 23, 20 ],
      drag: function( event, ui ) {
        var offset = $(this).offset(); // Avoir les coordonnées du slider
        var xPos = offset.left; //
        offset.left=changer_radio(xPos);
      },
      containment: "parent"
    });
    document.getElementById('nomRadio').style.top="65%";
    document.getElementById('nomRadio').style.left="50%";
  }
}
