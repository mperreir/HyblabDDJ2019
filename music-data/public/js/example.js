'use strict';
let datafollowers=[];
let datatracks=[];
let tabGenresmusicaux=[];
// fonction de trie des elements
function sortByy1(key1, key2){
  var x= parseInt(key1.y1);
  var y=parseInt(key2.y1);
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
   return key1.y1 > key2.y1;
}

function GetAllData()
{

  fetch('/data/')
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
      let lien="/tracks/"+key
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
               $('#menu').append("<button id='followers' class='buttonmenu' value="+key+"> Followers/Blogs/"+ key + "</button><br>");
               $('#menu').append("<button id='artistes' class='buttonmenu' value="+key+"> Artistes/Blogs/"+ key + "</button><br>");
               AfficherCursseur("#trackspourungenre",datatracks);
               creehistogram("#trackspourungenre",json,20);
               //"reflettrackspourungenre",
               creehistogramReflet("#trackspourungenreReflet",json,20);
               $('#menu').append("<button id='retour' class='buttonmenu'> Retour à l'ensemble des Genres </button>");
               $(document).on("click", "#retour", function(){
                  $('.slidecontainer').empty();
                $('#geresmusicales').show();
                $("#trackspourungenre").empty();
                $("#trackspourungenreReflet").empty();
                $('#artistespourungenre').empty();
                $("#menu").empty();
                $("#bloginformations").empty();



             });

             });

           }
    function followersdesblog(key)
           {
             //$(document).ready(function(){
             key = key.replace(" ", "_");
             console.log("lien",key)  ;
             let lien="/followers/"+key
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
                   //par defaut
                   //il faut definir le cursseur

                    datafollowers=data;

                      //je fais cette affichage juste pour que les choses soit claire, mais apres on doit la changer par le design et le mode d'affichage que l'on veut
                      AfficherCursseur("#followerspourungenre",datafollowers);
                      creehistogram("#followerspourungenre",data,20);
                      creehistogramReflet("#followerspourungenreReflet",data,20);
                      $('#menu').append("<button id='tracks' class='buttonmenu' value="+key+"> Tracks/Blogs/"+ key + "</button><br>");
                      $('#menu').append("<button id='artistes' class='buttonmenu' value="+key+"> Artistes/Blogs/"+ key + "</button><br>");
                      $('#menu').append("<button id='retour' class='buttonmenu'> Retour à l'ensemble des Genres </button>");

                      $(document).on("click", "#retour", function(){
                       $('.slidecontainer').empty();
                       $('#geresmusicales').show();
                       $("#followerspourungenre").empty();
                       $("#followerspourungenreReflet").empty();
                       $('#artistespourungenre').empty();
                       $("#menu").empty();
                       $("#bloginformations").empty();


                    });

                    });
           }
           function artistesdesblog(key)
                  {
                    key = key.replace(" ", "_");
                    //$(document).ready(function(){
                    console.log("lien",key)  ;
                    let lien="/artistes/"+key
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

                             $('#artistespourungenre').append('<table>' );
                             $('#artistespourungenre').append('<tr>' );
                             $('#artistespourungenre').append( '<td>Blog</td>' );
                             $('#artistespourungenre').append( '<td>Dernier Artiste</td>' );
                             $('#artistespourungenre').append('</tr>' );
                             for(var i=0;i<json.length;i++){
                                     $('#artistespourungenre').append('<tr>' );
                                     $('#artistespourungenre').append( '<td>' +  json[i]["NomdeBlog"]+ '</td>' );
                                     $('#artistespourungenre').append( '<td>' +  json[i]["NomDeDernierArtiste"]+ '</td></tr>' );
                                   }
                             $('#artistespourungenre').append(  '</table>' );
                             $('#menu').append("<button id='tracks' class='buttonmenu' value="+key+"> Tracks/Blogs/"+ key + "</button><br>");
                             $('#menu').append("<button id='followers' class='buttonmenu' value="+key+"> Followers/Blogs/"+ key + "</button><br>");
                             $('#menu').append("<button id='retour' class='buttonmenu'> Retour à l'ensemble des Genres </button>");

                             $(document).on("click", "#retour", function(){
                                 $('.slidecontainer').empty();
                              $('#geresmusicales').show();
                              $("#followerspourungenre").empty();
                              $("#trackspourungenre").empty();
                              $("#menu").empty();


                           });

                           });
                  }
    // les genres  accompagnés par leurs nombre de blogs
    function GetGenres()
    {
      fetch('/BlogParGenre/')
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
                 $('#geresmusicales').append("<button id= "+ escape(key)+ ">"+key+"</button>");
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
           let lien="/blogs/"+key
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
                $('#bloginformations').append(  '</table>' );
                });
                       }

    GetAllData();
    GetGenres();
    $(document).on("click", "#followers", function(){

        var x = $(this).attr("value");
        console.log("x",x);
          $('.slidecontainer').empty();
          $("#bloginformations").empty();
          $('#trackspourungenre').empty();
          $('#artistespourungenre').empty();
            $("#trackspourungenreReflet").empty();
          $("#menu").empty();
          followersdesblog(x);



  });
  $(document).on("click", "#tracks", function(){
      var x = $(this).attr("value");
      console.log("x",x);
      $('.slidecontainer').empty();
      $("#bloginformations").empty();
      $('#followerspourungenre').empty();
      $('#artistespourungenre').empty();
        $("#followerspourungenreReflet").empty();
      $("#menu").empty();
      tracksdesblog(x);


});
$(document).on("click", "#artistes", function(){
    var x = $(this).attr("value");
    console.log("x",x);

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
            console.log("x",x);
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
$('#selectcontry').append('<select id="cars" size="2" multiple>');
for(var i=0;i<tabGenresmusicaux.length;i++)
{
  if(i < (tabGenresmusicaux.length-1))
  {
    $('#selectcontry').append('<option value='+tabGenresmusicaux[i]+'>'+tabGenresmusicaux[i]+'</option>');
    console.log("pas encore");
  }


  else{
    $('#selectcontry').append('<option value='+tabGenresmusicaux[i]+'>'+tabGenresmusicaux[i]+'</option></select>');


  }
  }



  $('.slidecontainer').append('<div class="rectangle-path"><p id="valeurdeslider1">20</p><input type="range" id="slider" class="slider" min="0" max="157" value="20"></div>');
  $('.slidecontainer').append('<div class="rectangle-path2"><p id="valeurdeslider2">0</p><input type="range" id="slider2" class="slider" min="0" max="23000" value="0"></div>');

  $('.slidecontainer').append('<div class="rectangle-path3"><p id="valeurdeslider3">0</p><input type="range" id="slider3" class="slider" min="0" max="10000" value="0"></div>');
$('#slider2').on('click', function () {

  $('#valeurdeslider2').empty();
    $('#valeurdeslider2').append($(this).val());
});
$('#slider3').on('click', function () {

  $('#valeurdeslider3').empty();
    $('#valeurdeslider3').append($(this).val());
});
  $('#slider').on('click', function () {
    $('#valeurdeslider1').empty();
      $('#valeurdeslider1').append($(this).val());
    var newval=$(this).val();
    var mintracks=parseInt($('#slider2').val());
    var minfollowers=parseInt($('#slider3').val());
    console.log("min tracks",mintracks);
    console.log("min followers",minfollowers);
    //alert(newval);
    $(zone).empty();
    var reflet=zone + "Reflet";
    console.log("reflet",reflet);
    $(reflet).empty();
    console.log(zone,data);

    //pareil on travail sur une copie des donnéelse
var copiedata=JSON.parse(JSON.stringify(data));
    //je traite les données
    for(var i=0;i<copiedata.length;i++)
    {
      let rowData = {};
      let row={};
      Object.keys(copiedata[i]).forEach(current_key => {
      rowData[current_key] = copiedata[i][current_key];
      console.log(current_key,copiedata[i][current_key]);

      });
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
    console.log("donnee à traitée sur l histo", donnee);
    //je traite les données



    creehistogram(zone,donnee,parseInt(newval));
    //creehistogramReflet


    creehistogramReflet(reflet,donnee,parseInt(newval));
    donnee=[];

});
$('#cars').change(function(){
  var arr = $(this).val();
  console.log(arr)
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
    }
    else{
      nbbins=data.length;
    }
    console.log(nbbins);
    $('#valeurdeslider1').empty();
      $('#valeurdeslider1').append(nbbins);

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
function Genresmusicaux()
{
  fetch('/Genres/')
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
           console.log("genre musicaux",json.length);
           for(var i=0;i<json.length;i++)
           {

             tabGenresmusicaux[i]=json[i];
              console.log("genre",tabGenresmusicaux[i]);
           }
      });

}
  Genresmusicaux();
