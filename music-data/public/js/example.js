'use strict';
let datafollowers=[];
let datatracks=[];
let Tabpays=[];
let arr=[];
//$("#selectcontry").hide();
$('#bloginformations').hide();

// fonction de trie des elements
function sortByy1(key1, key2){
  var x= parseInt(key1.y1);
  var y=parseInt(key2.y1);
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
   return key1.y1 > key2.y1;
}

function GetAllData()
{

  fetch('data/')
      .then(function (response){
          if( response.ok )
          {
            return response.json();
          }
          else
              return {data: "JSON file not found"};
              })

      .catch( function (error){
          return {data: "Invalid JSON"};
      })
      .then(function (json) {
           console.log(json);
      });
}

    function tracksdesblog(key) {
      key= key.replace(" ", "_");
      console.log("lien",key);
      let lien="tracks/"+key
      fetch(lien)
          .then(function (response){
              if( response.ok )
              {
                return response.json();
              }
              else
                  return {data: "JSON file not found"};
              })
          .catch( function (error){
              return {data: "Invalid JSON"};
          })

          .then(function (json) {

                datatracks=json;


               AfficherCursseur("#trackspourungenre",datatracks);
               $('#menu').append('<div id="nomdegenre">'+key+'</div>');
               $('#menu').append('<div id="retour" class="rectangle-path">Genres</div>');
               $('#menu').append('<button class="rectangle-path" > Nombre de bars</button>');
              $('#menu').append('<div  class="rectangle-path">Tracks</div>');
               $('#menu').append('<button class="rectangle-path" id="followers"  value='+key+'>Followers</button>');
               //$('#bottonderetour').append('<button class="left" id="retour"  value="Genres">Genres</button>');

               creehistogram("#trackspourungenre",json,20);

               creehistogramReflet("#trackspourungenreReflet",json,20);
//bottonderetour
                $(document).on("click", "#retour", function(){
                $('.slidec').empty();
                $('#geresmusicales').show();
                $("#trackspourungenre").empty();
                $("#trackspourungenreReflet").empty();
                $('#artistespourungenre').empty();
                $("#menu").empty();
                $("#bottonderetour").empty();
                $("#bloginformations").empty();
                $("#bloginformations").hide();
                //$("#selectcontry").hide();



             });

             });

           }
    function followersdesblog(key)
           {
             //$(document).ready(function(){
             key = key.replace(" ", "_");
             console.log("lien",key)  ;
             let lien="followers/"+key
             fetch(lien)
                 .then(function (response){
                     if( response.ok )
                     {
                       return response.json();
                     }
                     else
                         return {data: "JSON file not found"};
                     })
                 .catch( function (error){
                     return {data: "Invalid JSON"};
                 })

                 .then(function (data) {

                    datafollowers=data;


                      //je fais cette affichage juste pour que les choses soit claire, mais apres on doit la changer par le design et le mode d'affichage que l'on veut
                     var pres_histo = document.createElement('DIV');
                     pres_histo.setAttribute('class',"pres-histo");
                     pres_histo.append("Survole les niveaux sonors, filtre et découvrezles blogs de ce genre.\n" +
                         "Sélectionne et compare afin de trouver l’artiste qui te fera vibrer.");
                     $('#menu').append("<div id='nomdegenre'>"+key+"</div>");
                     $('#menu').append(pres_histo);
                     AfficherCursseur("#followerspourungenre",datafollowers);
                      $('#menu').append('<div id="nomdegenre">'+key+'</div>');
                      $('#menu').append('<div id="retour" class="rectangle-path">Genres</div>');
                      $('#menu').append('<button class="rectangle-path">Nombre de Bars</button>');
                      $('#menu').append('<button id="tracks" class="rectangle-path" value='+key+'> Tracks</button>');
                      $('#menu').append('<button class="rectangle-path">Followers</button>');
                      //$('#bottonderetour').append('<button class="left" id="retour"  value="Genres">Genres</button>');
                      creehistogram("#followerspourungenre",data,20);
                      creehistogramReflet("#followerspourungenreReflet",data,20);

                      //$('#menu').append("<button id='retour' class='buttonmenu'> Retour à l'ensemble des Genres </button>");

                      $(document).on("click", "#retour", function(){
                       $('.slidec').empty();
                       $('#geresmusicales').show();
                       $("#followerspourungenre").empty();
                       $("#followerspourungenreReflet").empty();
                       $('#artistespourungenre').empty();
                       $("#menu").empty();

                       $("#bottonderetour").empty();
                       $("#bloginformations").empty();
                       $("#bloginformations").hide();
                       $("#selectcontry").hide();


                    });

                    });
           }
           function artistesdesblog(key)
                  {
                    key = key.replace(" ", "_");
                    //$(document).ready(function(){
                    console.log("lien",key)  ;
                    let lien="artistes/"+key
                    fetch(lien)
                        .then(function (response){
                            if( response.ok )
                            {
                              return response.json();
                            }
                            else
                                return {data: "JSON file not found"};
                            })
                        .catch( function (error){
                            return {data: "Invalid JSON"};
                        })

                        .then(function (json) {
                             console.log(json);
                             //je fais cette affichage juste pour que les choses soit claire, mais apres on doit la changer par le design et le mode d'affichage que l'on veut


                           });
                  }

// les genres  accompagnés par leurs nombre de blogs
function GetGenres()
{
    $("#selectcontry").hide();
    fetch('BlogParGenre/')
        .then(function (response){
            if( response.ok )
            {
                return response.json();
            }
            else
                return {data: "JSON file not found"};
        })
        .catch( function (error){
            return {data: "Invalid JSON"};
        })

        .then(function (json) {
            console.log(json);
            //$('.slidecontainer').hide();
            var i=0;
            var j=0;
            // ajout du titre de la page
            var title = document.createElement('div');
            title.setAttribute("class", "presentation-choix-genre");
            title.append("Clique sur ton influence et explore ses blogs");
            $('#geresmusicales').append(title);
            $.each( json, function( key, val ) {
                // ici je vais affcher l'ensemble des genre accompagnés chacun par le nombre de blog qui le contient
                //$('#geresmusicales').append("<button id= "+ escape(key)+ ">"+key+"</button>");
                //$('#geresmusicales').append(" le nombre de blogs est " + val +  "<br>");
                //$('#onde-genres').append("<div id='genre-+escape(key) class='onde-genre'>key</div>");
                //$('#onde-genres').append("<div id="+ escape(key)+ "class='onde-genre'>"+key+"<object type='image/svg+xml' data='img/choix-genres/'"+key+".svg class='onde-genre-svg'</div>");
                //key ==> le id de genre
                //$('#geresmusicales').append("<button id= "+ escape(key)+ ">"+key+"</button>");
                //le nombre de blog pour ce genre
                //$('#geresmusicales').append(" le nombre de blogs est " + val +  "<br>");

                // creation d'une section pour chaque genre
                var genre = document.createElement("DIV");
                genre.setAttribute("id", escape(key));

                // creation du svg correspondant au genre
                var svg = document.createElement('OBJECT');
                svg.setAttribute("class","onde-test");
                svg.setAttribute("type","image/svg+xml");
                svg.setAttribute("data", "img/choix-genres/"+key+".svg");
                svg.style.width="100%";
                svg.style.height="100%";
                // creation d'une div pour le titre du genre
                var titre = document.createElement("DIV");
                titre.setAttribute("class", "titre-choix-genre");
                titre.append(key);

                // style de la section genre
                genre.style.position="absolute";
                genre.style.top = 33+(20*j)+"%";
                genre.style.left = 18+(20*i)+"%";
                genre.style.width="10%";
                genre.style.height="auto";

                // ajout des sections complementaires
                genre.append(svg);
                genre.append(titre);

                // Last arrangement
                //$('#genres .fp-tableCell').append(genre);
                $('#geresmusicales').append(genre);
                //var k="#" + key;

                var k="#"+key.replace("%20","\\ ");
                console.log("k",k);
                i++;
                if(i==4){
                    j++;
                    i=0;
                }
                /*$("#choix-"+key).select("svg").setAttribute("onmouseover",function(key){
                    this.style.width=this.style.width+10+"%";
                    this.style.height=this.style.height+10+"%";
                    this.style.color = "#FF00000";
                });*/

                //var svg = $("#"+escape(key)).select('svg').append("TESTTTTTT");
                /*elem.hover(function(){
                    console.log("hover sur un choix de genre");
                    //this.setAttribute("class","titre-choix-genre-hover");
                    this.style.width=this.style.width+10+"%";
                    this.style.height=this.style.height+10+"%";
                    this.style.color = "#FF00000";
                });*/

                $(document).on("click", "#"+key, function(){
                    console.log("appel fonction");
                    tracksdesblog(key);

                    $('#geresmusicales').hide();

                });

            });
            $("#choix-Funk").select(".onde-test").style.width="60%";
            var defss = $('#Funk').select('defs');
            var anime = document.createElement('ANIME');
            /*anime.setAttribute["animate id"] = "Funk";
            anime.setAttribute["attributeName"]="top";
            anime.setAttribute["attributeType"]="XML";
            anime.setAttribute["from"]="60";
            anime.setAttribute["to"]="10";
            anime.setAttribute["begin"]="5s";
            anime.setAttribute["dur"]="4s";
            anime.setAttribute["fill"]="freeze";*/
            defss.append(anime);
        });
}
    // les genres  accompagnés par leurs nombre de blogs
    function GetGenres2()
    {
      $("#selectcontry").hide();
      fetch('BlogParGenre/')
          .then(function (response){
              if( response.ok )
              {
                return response.json();
              }
              else
                  return {data: "JSON file not found"};
              })
          .catch( function (error){
              return {data: "Invalid JSON"};
          })

          .then(function (json) {
               console.log(json);
               //$('.slidecontainer').hide();
               $.each( json, function( key, val ) {
                 // ici je vais affcher l'ensemble des genre accompagnés chacun par le nombre de blog qui le contient
                 //$('#geresmusicales').append("<button id= "+ escape(key)+ ">"+key+"</button>");
                 //$('#geresmusicales').append(" le nombre de blogs est " + val +  "<br>");
                 //$('#onde-genres').append("<div id='genre-+escape(key) class='onde-genre'>key</div>");
                 //$('#onde-genres').append("<div id="+ escape(key)+ "class='onde-genre'>"+key+"<object type='image/svg+xml' data='img/choix-genres/'"+key+".svg class='onde-genre-svg'</div>");
                 //key ==> le id de genre
                 $('#geresmusicales').append("<button id= "+ escape(key)+ ">"+key+"</button>");
                 //le nombre de blog pour ce genre
                 $('#geresmusicales').append(" le nombre de blogs est " + val +  "<br>");

                 //var k="#" + key;
                 var k="#"+key.replace("%20","\\ ");
                 console.log("k",k);

                 $(document).on("click", k, function(){


                  console.log("appel fonction");
                  tracksdesblog(key);

                  $('#geresmusicales').hide();



                 });

                  });
                  });
                }

        function bloginformations(key) {
          key = key.replace(' ', '_')
           let lien="blogs/"+key
            fetch(lien)
            .then(function (response){
             if( response.ok )
             {return response.json();  }
                                 else
                                     return {data: "JSON file not found"};
                                 })
             .catch( function (error){
                                 return {data: "Invalid JSON"};
                             })

             .then(function (json) {
                  console.log(json);
                  var cles = Object.keys(json[0]);
                  $('#bloginformations').show();
                  $('#bloginformations').append('Genre : '+json[0]["Genre"]+'<br>');
                  $('#bloginformations').append('Name : '+json[0]["Name"]+'<br>');
                  $('#bloginformations').append('Followers : '+json[0]["Followers"]+'<br>');
                  $('#bloginformations').append('Tracks : '+json[0]["Tracks"]+'<br>');
                  $('#bloginformations').append('Country : '+json[0]["Country"]+'<br>');

                  //la je ferai ce que je veux
                  /*
                  $('#bloginformations').append('<table>' );
                  $('#bloginformations').append('<tr>' );
                  for(var i=0;i<cles.length;i++){
                  $('#bloginformations').append( '<td>' +  cles[i] + '</td>' );
                  }
                $('#bloginformations').append('</tr>' );
                $('#bloginformations').append('<tr>' );
                for(var j=0;j<cles.length;j++){
                var v=cles[j];
                $('#bloginformations').append( '<td>' +  json[0][v]+ '</td>' );
                }
                $('#bloginformations').append('</tr>' );
                $('#bloginformations').append(  '</table>' );*/

                });
                       }

    GetAllData();
    GetGenres();
    $(document).on("click", "#followers", function(){

        var x = $(this).attr("value");
        console.log("x",x);
          $('.slidec').empty();
          $("#bloginformations").hide();
          $("#bloginformations").empty();
          $('#trackspourungenre').empty();
          $('#artistespourungenre').empty();
          $("#trackspourungenreReflet").empty();
          $("#menu").empty();

          $("#bottonderetour").empty();
          $("#bloginformations").empty();
          //$("#selectcontry").show();
          followersdesblog(x);



  });
  $(document).on("click", "#tracks", function(){
      var x = $(this).attr("value");
      console.log("x",x);
      $('.slidec').empty();
      $("#bloginformations").empty();
      $("#bloginformations").hide();
      $('#followerspourungenre').empty();
      $('#artistespourungenre').empty();
        $('#followerspourungenreReflet').empty();
      $('#menu').empty();

      $("#bottonderetour").empty();
      $("#bloginformations").empty();
      tracksdesblog(x);


});
$(document).on("click", "#artistes", function(){
    var x = $(this).attr("value");
    console.log("x",x);
      $("#bloginformations").hide();
      $("#bloginformations").empty();
      $('#followerspourungenre').empty();
      $('#trackspourungenre').empty();

      $("#menu").empty();
      $("#trackspourungenreReflet").empty();
      $("#followerspourungenreReflet").empty();


    artistesdesblog(x);
});



$(document).ready(function(){
  $('#fullpage').fullpage({
    //options here
    autoScrolling:true,
    scrollHorizontally: true
  });

});


function creehistogram(id,data1,val)
{
    var data=JSON.parse(JSON.stringify(data1));
    console.log("data1",data1);
    console.log("data",data);
    console.log("appel histogram");
    data.sort(sortByy1);

    var nbbins;
    if(data.length>val)
    {
      var t=data.length -val;
       data.splice(0,t);
       nbbins=val;
    }

    else if(data.length>20)
    {
      var t=data.length -20;
       data.splice(0,t);
       nbbins=20;
    }
    else{
      nbbins=data.length;
    }
  const margin = {top: 5, right: 5, bottom: 5, left: 5},

    height = 250 - margin.top - margin.bottom;
    var width;
    if( nbbins*16 < 1200)

    {width = nbbins*16 - margin.left - margin.right;}
    else {
      {
        width=1200-margin.left - margin.right;
      }
    }
    const x = d3.scaleBand()
    .range([0, width])

    .padding(0.1);


    const y = d3.scaleLinear()
    .range([height, 0]);
    const svg = d3.select(id).append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)

    .attr("height", height + margin.top + margin.bottom )

    .append("g")

    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
       d.y1 = +d.y1;
       console.log(d.y1);
   });
   var variable=d3.max(data, function(d) { return d.y1; });
   console.log("max",variable);
    x.domain(data.map(function(d) { return d.x1; }));
    y.domain([0, d3.max(data, function(d) { return d.y1; })]);

    svg.selectAll(".bar1")
       .data(data)
       .enter().append("rect")
       .attr("class", "bar1")
       .attr("id",function(d) { return d.id; })
       .attr("x", function(d) { return x(d.x1); })
       .attr("width",  8)
       .attr("y", function(d) { if((height -y(d.y1)>0)){return y(d.y1);} else {return 239;} })
       //237.4478945129732
       .attr("height", function(d) {
          if((height -y(d.y1)>0)){return height -y(d.y1);} else {return 1;} })

       $(document).ready(function(){
        $(".bar1").hover(
          function() {
            $("#bloginformations").empty();
            var x = $(this).attr("id");
            console.log("blog info",x);
            bloginformations(x);
      }, function() {
      console.log("rien");
  }


    );

});}

let donnee=[];

function AfficherCursseur(zone,data)
{
  var dataactuelle;
  let rowData = {};

  //$("#selectcontry").show();


/*  $('#menu').append('<div class="rectangle-path4"></div>');
  $('#menu').append('<button class="rectangle-path" > Nombre de bars</button>');
  $('#menu').append('<button  class="rectangle-path"> Tracks</button>');
  $('#menu').append('<button class="rectangle-path" id="followers" >Followers</button>');
  $('#bottonderetour').append('<button class="left" id="retour"  value="Genres">Genres</button>');
*/
  $('.slidec').append('<div class="selectcontry"><select id="selectcontry" size="2" multiple></select>');
  $("#selectcontry").append('<option value="All" selected="selected">All</option>');
      arr.push("All");
     for(var i=0;i<Tabpays.length;i++)
     {


       $("#selectcontry").append('<option value='+Tabpays[i]+'>'+Tabpays[i] + '</option>');
      //  console.log("genre",Tabpays[i]);
     }
     $('.slidec').append('</div>')

     //$("#selectcontry").hide();

     console.log("pays tab",Tabpays);
  $('.slidec').append('<div class="rectangle-path"><p id="valeurdeslider1">20</p><input type="range" id="slider" class="slider" min="0" max="157" value="20"></div>');
  $('.slidec').append('<div class="rectangle-path"><p id="valeurdeslider2">0</p><input type="range" id="slider2" class="slider" min="0" max="23000" value="0"></div>');
  $('.slidec').append('<div class="rectangle-path"><p id="valeurdeslider3">0</p><input type="range" id="slider3" class="slider" min="0" max="10000" value="0"></div>');
  $('#slider2').on('change', function () {
    $(zone).empty();
    var reflet=zone + "Reflet";
    $(reflet).empty();
  $('#valeurdeslider2').empty();
  $('#valeurdeslider2').append($(this).val());
  $('#bloginformations').hide();

  traitementsurlesdonnees(data,zone);
  });
  $('#slider3').on('change', function () {
    $(zone).empty();
    var reflet=zone + "Reflet";
    $(reflet).empty();
  $('#valeurdeslider3').empty();
  $('#valeurdeslider3').append($(this).val());
  $('#bloginformations').hide();
  traitementsurlesdonnees(data,zone);
});
  $('#slider').on('change', function () {
    //la je devrais mettre une copie de data
    $(zone).empty();
    var reflet=zone + "Reflet";
    $(reflet).empty();
    $('#valeurdeslider1').empty();
    $('#valeurdeslider1').append($(this).val());
    $('#bloginformations').hide();
    traitementsurlesdonnees(data,zone);
});
$('#selectcontry').change(function(){
  arr=[];
  console.log(arr);
  $(this).val().forEach(function(element)
  {
  console.log("element",element);
  arr.push(element);
}
);
$(zone).empty();
var reflet=zone + "Reflet";
$(reflet).empty();
// j'appelle ici le truc de traitementsurlesdonnees
traitementsurlesdonnees(data,zone);


});


}

function creehistogramReflet(id,data1,val)
{

    var data=JSON.parse(JSON.stringify(data1));
    console.log("data1",data1);
    console.log("data",data);
    console.log("appel histogram");
    data.sort(sortByy1);
    var nbbins;
    if(data.length>val)
    {
      var t=data.length -val;
       data.splice(0,t);
       nbbins=val;
    }

    else if(data.length>20)
    {
      var t=data.length -20;
       data.splice(0,t);
       nbbins=20;
      // alert("Le nombre de bar que vous voulez afficher est supérieur aux nombre de blog, on va vous afficher la valeur par défaut des bars, que 20 bars");
    }
    else{
      nbbins=data.length;
      //alert("Le nombre de bar que vous voulez afficher est supérieur aux nombre de blog et superieur à la valeur par défaut 20, on va vous afficher le nombre de bars possible")
    }
    console.log(nbbins);

    $('#valeurdeslider1').empty();
    $('#valeurdeslider1').append(nbbins);
    $('#valeurdeslider1').append("|",val);


    const margin = {top: 5, right: 5, bottom: 5, left: 5},

    height = 150 - margin.top - margin.bottom;
    var width ;
    if( nbbins*16 < 1200)

    {width = nbbins*16 - margin.left - margin.right;}
    else {

        width=1200-margin.left - margin.right;
      }

    const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
    const y = d3.scaleLinear()
    .range([0, height]);
    const svg = d3.select(id).append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom )
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    data.forEach(function(d) {
       d.y1 = +d.y1;
       console.log(d.y1);
    });
    var variable=d3.max(data, function(d) { return d.y1; });
    console.log("max",variable);
    x.domain(data.map(function(d) { return d.x1; }));
    y.domain([0, d3.max(data, function(d) { return d.y1; })]);
       svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")


        .attr("x", function(d) { return x(d.x1); })
        .attr("width",8)
        .attr("y", 0)
        .attr("height", function(d) { if(y(d.y1)>0){return y(d.y1);} else{ return 0.75 ;} })

}
function Getpays()
{
  fetch('pays/')
      .then(function (response){
          if( response.ok )
          {
            return response.json();
          }
          else
              return {data: "JSON file not found"};
              })

      .catch( function (error){
          return {data: "Invalid JSON"};
      })
      .then(function (json) {
        //$("#selectcontry").append('<option value="All" selected="selected">All</option>');
        //arr.push("All");
           for(var i=0;i<json.length;i++)
           {

             Tabpays.push(json[i]);
             //$("#selectcontry").append('<option value='+Tabpays[i]+'>'+Tabpays[i] + '</option>');
            //  console.log("genre",Tabpays[i]);
           }


           //$("#selectcontry").hide();

           console.log("pays tab",Tabpays);
      });


}
function traitementsurlesdonnees(data,zone)
{
var reflet=zone + "Reflet";
var nbbins=parseInt($('#slider').val());
var mintracks=parseInt($('#slider2').val());
var minfollowers=parseInt($('#slider3').val());

var copiedata=JSON.parse(JSON.stringify(data));
  for(var i=0;i<copiedata.length;i++)
  {
    let rowData = {};
    let row={};
    Object.keys(copiedata[i]).forEach(current_key => {
    rowData[current_key] = copiedata[i][current_key];


    });
if(arr.includes("All"))
{
if(zone == "#trackspourungenre")
{
  if(rowData["y1"]>= mintracks && rowData["z1"] >= minfollowers)
{
  //console.log();
  donnee.push(rowData);
}
}
else{
  if(rowData["z1"]>= mintracks && rowData["y1"] >= minfollowers)
{
  //console.log();
  donnee.push(rowData);
}
}
}
  else{
    if(arr.includes(rowData["pays"]))
      {
        console.log("pays inclue");
        if(zone == "#trackspourungenre")
        {
          if(rowData["y1"]>= mintracks && rowData["z1"] >= minfollowers)
        {
          //console.log();
          donnee.push(rowData);
        }
      }
        else{
          if(rowData["z1"]>= mintracks && rowData["y1"] >= minfollowers)
        {
          //console.log();
          donnee.push(rowData);
        }
        }
      }
  }

  }


if(donnee.length == 0)
{
alert("il n'a aucune donnée avec ces choix");
$('#bloginformations').empty();
}
else{
creehistogram(zone,donnee,parseInt(nbbins));
//creehistogramReflet


creehistogramReflet(reflet,donnee,parseInt(nbbins));
}

  donnee=[];

}
  Getpays();
