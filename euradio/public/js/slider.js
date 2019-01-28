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

var radios = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed','Al', 'Euradio', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua','Ut','Coucou'];

function changer_radio(xPos){
  var valeur = ((xPos - 667)/27)+10; //Valeur réelle
  $( "#nomRadio p" ).text(radios[valeur]);
}
