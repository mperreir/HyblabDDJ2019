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

GetAllData();
GetGenres();

$(document).ready(function(){
  $('#fullpage').fullpage({
    //options here
    autoScrolling:true,
    scrollHorizontally: true
  });
  //$.fn.fullpage.setAllowScrolling(false);
});
