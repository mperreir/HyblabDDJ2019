'use strict';

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
               console.log("données",json);
               creehistogram("#trackspourungenre",json);
               //je fais cette affichage juste pour que les choses soit claire, mais apres on doit la changer par le design et le mode d'affichage que l'on veut
               // la je devrais faire l'histogramme
               /*$('#trackspourungenre').append('<table>' );
               $('#trackspourungenre').append('<tr>' );
               $('#trackspourungenre').append( '<td>Blog</td>' );
               $('#trackspourungenre').append( '<td>Track</td>' );
               $('#trackspourungenre').append('</tr>' );
               for(var i=0;i<json.length;i++){
                  var id=json[i]["NomdeBlog"];
                  console.log(escape(id));
                       $('#trackspourungenre').append('<tr>' );
                       $('#trackspourungenre').append( '<td class="mouse" id='+escape(id)+'>' +  json[i]["NomdeBlog"]+ '</td>' );
                       $('#trackspourungenre').append( '<td>' +  json[i]["NombredeTracks"]+ '</td></tr>' );

                     }
               $('#trackspourungenre').append(  '</table>' );
               $('#trackspourungenre').append("<button id='retour'> Retour à l'ensemble des Genres </button>");

               $('#menu').append("<button id='followers' class='buttonmenu' value="+key+"> Followers/Blogs/"+ key + "</button><br>");
               $('#menu').append("<button id='artistes' class='buttonmenu' value="+key+"> Artistes/Blogs/"+ key + "</button><br>");
                //On passant la souris sur le nom de blog
                $(document).ready(function(){
                $(".mouse").hover(function(){
                  var x = $(this).attr("id");
                  var y=x.replace("%20"," ");
                  //id est dans y
                  //j'envoie la requete
                  console.log("y",y);
            }
            );
          });



               $(document).on("click", "#retour", function(){

                $('#geresmusicales').show();
                $("#trackspourungenre").empty();
                $('#artistespourungenre').empty();
                $("#menu").empty();



             });*/

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

                 .then(function (json) {
                      console.log(json);
                      //je fais cette affichage juste pour que les choses soit claire, mais apres on doit la changer par le design et le mode d'affichage que l'on veut

                      $('#followerspourungenre').append('<table>' );
                      $('#followerspourungenre').append('<tr>' );
                      $('#followerspourungenre').append( '<td>Blog</td>' );
                      $('#followerspourungenre').append( '<td>Followers</td>' );
                      $('#followerspourungenre').append('</tr>' );
                      for(var i=0;i<json.length;i++){
                              $('#followerspourungenre').append('<tr>' );
                              $('#followerspourungenre').append( '<td>' +  json[i]["NomdeBlog"]+ '</td>' );
                              $('#followerspourungenre').append( '<td>' +  json[i]["NombredeFollowers"]+ '</td></tr>' );
                            }
                      $('#followerspourungenre').append(  '</table>' );
                      $('#menu').append("<button id='tracks' class='buttonmenu' value="+key+"> Tracks/Blogs/"+ key + "</button><br>");
                      $('#menu').append("<button id='artistes' class='buttonmenu' value="+key+"> Artistes/Blogs/"+ key + "</button><br>");
                      $('#followerspourungenre').append("<button id='retour'> Retour à l'ensemble des Genres </button>");

                      $(document).on("click", "#retour", function(){
                       $('#geresmusicales').show();
                       $("#followerspourungenre").empty();
                       $('#artistespourungenre').empty();
                       $("#menu").empty();


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
                             $('#artistespourungenre').append("<button id='retour'> Retour à l'ensemble des Genres </button>");

                             $(document).on("click", "#retour", function(){
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



    GetAllData();
    GetGenres();
    $(document).on("click", "#followers", function(){
        var x = $(this).attr("value");
        console.log("x",x);

          $('#trackspourungenre').empty();
          $('#artistespourungenre').empty();
          $("#menu").empty();

          followersdesblog(x);



  });
  $(document).on("click", "#tracks", function(){
      var x = $(this).attr("value");
      console.log("x",x);
      $('#followerspourungenre').empty();
      $('#artistespourungenre').empty();
      $("#menu").empty();
      tracksdesblog(x);





});
//artistes
$(document).on("click", "#artistes", function(){
    var x = $(this).attr("value");
    console.log("x",x);
    $('#followerspourungenre').empty();
    $('#trackspourungenre').empty();
    $("#menu").empty();
    artistesdesblog(x);
});
function creehistogram(id,data)
{
  const margin = {top: 20, right: 20, bottom: 150, left: 120},
    width = 800 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
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
       d.NombredeTracks = +d.NombredeTracks;
   });
    x.domain(data.map(function(d) { return d.NomdeBlog; }));
    y.domain([0, d3.max(data, function(d) { return d.NombredeTracks; })]);
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
        .attr("x", function(d) { return x(d.NomdeBlog); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.NombredeTracks); })
        .attr("height", function(d) { return height - y(d.NombredeTracks); })
        $(document).ready(function(){
        $(".bar").hover(function(){
          var x = $(this).attr("id");
          //var y=x.replace("%20"," ");
          //id est dans y
          //j'envoie la requete
          console.log("x",x);
    }
    );

});}





// pour générer un event on passons la souris
