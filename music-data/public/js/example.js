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
      key.replace(" ", "_");
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
               console.log(json);
               //je fais cette affichage juste pour que les choses soit claire, mais apres on doit la changer par le design et le mode d'affichage que l'on veut

               $('#trackspourungenre').append('<table>' );
               $('#trackspourungenre').append('<tr>' );
               $('#trackspourungenre').append( '<td>Blog</td>' );
               $('#trackspourungenre').append( '<td>Track</td>' );
               $('#trackspourungenre').append('</tr>' );
               for(var i=0;i<json.length;i++){
                       $('#trackspourungenre').append('<tr>' );
                       $('#trackspourungenre').append( '<td>' +  json[i]["NomdeBlog"]+ '</td>' );
                       $('#trackspourungenre').append( '<td>' +  json[i]["NombredeTracks"]+ '</td></tr>' );
                     }
               $('#trackspourungenre').append(  '</table>' );
               $('#trackspourungenre').append("<button id='retour'> Retour à l'ensemble des Genres </button>");
               $('#menu').append("<button id='followers' class='buttonmenu' value="+key+"> Followers/Blogs/"+ key + "</button><br>");
               $('#menu').append("<button id='artistes' class='buttonmenu' value="+key+"> Artistes/Blogs/"+ key + "</button><br>");
               $(document).on("click", "#retour", function(){

                $('#geresmusicales').show();
                $("#trackspourungenre").empty();
                $('#artistespourungenre').empty();
                $("#menu").empty();



             });

             });

           }
    function followersdesblog(key)
           {
             //$(document).ready(function(){
             key.replace(" ", "_");
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
                    key.replace(" ", "_");
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
                 $('#geresmusicales').append("<button id= "+ key+ ">"+key+"</button>");
                 $('#geresmusicales').append(" le nombre de blogs est " + val +  "<br>");
                 var k="#" + key;

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

/*
$(document).ready(function() {
  	$('#fullpage').fullpage();
});
*/
$(document).ready(function(){
  $('#fullpage').fullpage({
    //options here
    autoScrolling:true,
    scrollHorizontally: true
  });
  //$.fn.fullpage.setAllowScrolling(false);
});
