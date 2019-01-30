'use strict';
let datafollowers=[];
let datatracks=[];
// fonction de trie des elements
function sortByy1(key1, key2){
  var x= parseInt(key1.y1);
  var y=parseInt(key2.y1);
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
   r//eturn key1.y1 > key2.y1;
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
      console.log("lien",key)  ;
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
               $('#menu').append("<button id='retour'> Retour à l'ensemble des Genres </button>");
               $(document).on("click", "#retour", function(){
                  $('.slidecontainer').empty();
                $('#geresmusicales').show();
                $("#trackspourungenre").empty();
                $('#artistespourungenre').empty();
                $("#menu").empty();
                $("#bloginformations").empty();



             });

             });

           }
    function followersdesblog(key)
           {
             //$(document).ready(function(){
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
                      $('#menu').append("<button id='tracks' class='buttonmenu' value="+key+"> Tracks/Blogs/"+ key + "</button><br>");
                      $('#menu').append("<button id='artistes' class='buttonmenu' value="+key+"> Artistes/Blogs/"+ key + "</button><br>");
                      $('#menu').append("<button id='retour'> Retour à l'ensemble des Genres </button>");

                      $(document).on("click", "#retour", function(){
                        $('.slidecontainer').empty();
                       $('#geresmusicales').show();
                       $("#followerspourungenre").empty();
                       $('#artistespourungenre').empty();
                       $("#menu").empty();
                       $("#bloginformations").empty();


                    });

                    });
           }
           function artistesdesblog(key)
                  {
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
                             $('#menu').append("<button id='retour'> Retour à l'ensemble des Genres </button>");

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
          $("#menu").empty();
          followersdesblog(x);



  });
  $(document).on("click", "#tracks", function(){
      var x = $(this).attr("value");
      console.log("x",x);
      $('.slidecontainer').empty();
      $('#followerspourungenre').empty();
      $('#artistespourungenre').empty();
      $("#menu").empty();
      tracksdesblog(x);





});
//artistes
$(document).on("click", "#artistes", function(){
    var x = $(this).attr("value");
    console.log("x",x);

      $("#bloginformations").empty();
    $('#followerspourungenre').empty();
    $('#trackspourungenre').empty();
    $("#menu").empty();
    artistesdesblog(x);
});
function creehistogram(id,data1,val)
{
    //console.log("data1",data1);
    //var data = data1;
    var data=JSON.parse(JSON.stringify(data1));
    console.log("data1",data1);
    console.log("data",data);
    data.sort(sortByy1);

    if(data.length>val)
    {
      var t=data.length -val;
       data.splice(0,t);
    }
    //data.length<val
    //alors on teste si data.length>20 ==> si c'est le cas alors on affiche 20 bars
    else if(data.length>20)
    {
      var t=data.length -20;
       data.splice(0,t);
    }

  const margin = {top: 20, right: 20, bottom: 150, left: 120},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
    const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

    const y = d3.scaleLinear()
    .range([height, 0]);
    const svg = d3.select(id).append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
       d.y1 = +d.y1;
   });
   var variable=d3.max(data, function(d) { return d.y1; });
   console.log("max",variable);
    x.domain(data.map(function(d) { return d.x1; }));
    y.domain([0, d3.max(data, function(d) { return d.y1; })]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-87)");

    svg.append("g")
        .call(d3.axisLeft(y).ticks(6));
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("id",function(d) { return d.id; })
        .attr("x", function(d) { return x(d.x1); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return height - y(d.y1); })
        $(document).ready(function(){
        $(".bar").hover(
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


function AfficherCursseur(zone,data)
{
  $('.slidecontainer').append('<input type=range id="slider" class="slider" min="1" max="157" value="20">');
  $('.slidecontainer').append('<p id="valeurdeslider" style="text-align: center;">  </p>');
  $('input[type=range]').on('input', function () {
    var newval=$(this).val();
    alert(newval);
    $(zone).empty();

    console.log(zone,data);
    creehistogram(zone,data,parseInt(newval));
});

}








// pour générer un event on passons la souris
