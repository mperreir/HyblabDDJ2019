'use strict';


var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
let fs = require('fs');
let fastcsv = require('fast-csv');
let readableStreamInput = fs.createReadStream('./music-data/public/data/musicdata.csv');
let csvData = [];
let genremusicales=[];
let k=0;

app.use(express.static(path.join(__dirname, 'public')));
/*http.createServer(function(req, res){
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('public/index.html').pipe(res);
    } else if (req.url === '/tracks') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('public/tracks.html').pipe(res);
}
}).listen(3000);*/
app.listen(3000, function(req, res) {
  console.log('en ecoute sur le port 3000');
});
fastcsv.fromStream(readableStreamInput, {headers: true,strictColumnHandling: true})
        .on('data', (data) => {
        let rowData = {};
        let row={};
        Object.keys(data).forEach(current_key => {
        rowData[current_key] = data[current_key];

        });
       csvData.push(rowData);

        }).on('end', () => {
         console.log("récupération");
          console.log(csvData);

          k=1;

    });
app.get('/data', function(req,resp){

if(k==1){

  resp.send(JSON.stringify(csvData));
  console.log(csvData);
}



});

    app.get('/BlogParGenre', function(req,resp){
    let   resultat={};
    let genrefollowers=[];
      let rowData = {};
      if(k==1){

        for(var i=0;i<csvData.length;i++)
        {

          if(resultat[csvData[i].Genre]==null)
          {
              resultat[csvData[i].Genre]=1;
          }
          else{
            resultat[csvData[i].Genre] += 1;
          }
        }
        resp.send(JSON.stringify(resultat));
    }
    });



    app.get('/Genres', function(req,resp){

    let genremusicales=[];

      if(k==1){

        for(var i=0;i<csvData.length;i++)
        {

          if(! genremusicales.includes(csvData[i].Genre))
          {

            genremusicales.push(csvData[i].Genre);
          }
          else{
            console.log("element existant");
          }
        }
        //console.log(genremusicales);
        resp.send(JSON.stringify(genremusicales));

}
});
app.get('/tracks/:genre', function(req,resp){
  //il faut enlever les espaces de tous les genre qui contient des espaces, sinon ça donne pas un résultat
  var p1 = req.params.genre;
  console.log(p1);
  let tracksgenre=[];
  let rowData = {};
    if(k==1){

      for(var i=0;i<csvData.length;i++)
      {

            if(csvData[i].Genre == p1)
            {

              rowData["NomdeBlog"] = csvData[i].Name;
              rowData["NombredeTracks"] = csvData[i].Tracks;
              tracksgenre.push(rowData);
              rowData={};

            }
            else{
              console.log("false");
            }

      }


      resp.send(JSON.stringify(tracksgenre));
  }

});
app.get('/followers/:genre', function(req,resp){
  //il faut enlever les espaces de tous les genre qui contient des espaces, sinon ça donne pas un résultat
  var p1 = req.params.genre;
  console.log(p1);
  let followersgenre=[];
  let rowData = {};
    if(k==1){

      for(var i=0;i<csvData.length;i++)
      {
            if(csvData[i].Genre == p1)
            {

              rowData["NomdeBlog"] = csvData[i].Name;
              rowData["NombredeFollowers"] = csvData[i].Followers;
              followersgenre.push(rowData);
              rowData={};

            }


      }
  resp.send(JSON.stringify(followersgenre));
  }

});
app.get('/artistes/:genre', function(req,resp){
  //il faut enlever les espaces de tous les genre qui contient des espaces, sinon ça donne pas un résultat
  var p1 = req.params.genre;
  console.log(p1);
  let followersgenre=[];
  let rowData = {};
    if(k==1){

      for(var i=0;i<csvData.length;i++)
      {
            if(csvData[i].Genre == p1)
            {

              rowData["NomdeBlog"] = csvData[i].Name;
              rowData["NomDeDernierArtiste"] = csvData[i].ArtistRecentlyposted;
              followersgenre.push(rowData);
              rowData={};

            }


      }
  resp.send(JSON.stringify(followersgenre));
  }

});

module.exports = app;
/*

//Quelques fonctionnalités qu'on aura besoin
app.get('/FollowersParPays', function(req,resp){
let   resultat={};
let genrefollowers=[];
  let rowData = {};
  if(k==1){

    for(var i=0;i<csvData.length;i++)
    {

      if(resultat[csvData[i].Country]==null)
      {
          resultat[csvData[i].Country]=parseInt(csvData[i].Followers);
      }
      else{
        resultat[csvData[i].Country]=(parseInt(resultat[csvData[i].Country])+parseInt(csvData[i].Followers));
      }
    }
    resp.send(JSON.stringify(resultat));
}
});
app.get('/BlogParPays', function(req,resp){
let   resultat={};
let genrefollowers=[];
  let rowData = {};
  if(k==1){

    for(var i=0;i<csvData.length;i++)
    {

      if(resultat[csvData[i].Country]==null)
      {
          resultat[csvData[i].Country]=1;
      }
      else{
        resultat[csvData[i].Country] += 1;
      }
    }
    resp.send(JSON.stringify(resultat));
}
});
app.get('/TracksParGenre', function(req,resp){
let   resultat={};
let genrefollowers=[];
  let rowData = {};
  if(k==1){

    for(var i=0;i<csvData.length;i++)
    {

      if(resultat[csvData[i].Genre]==null)
      {
          resultat[csvData[i].Genre]=parseInt(csvData[i].Tracks);
      }
      else{
        resultat[csvData[i].Genre]=(parseInt(resultat[csvData[i].Genre])+parseInt(csvData[i].Tracks));
      }
    }

    resp.send(JSON.stringify(resultat));
}
});
app.get('/FollowersParGenre', function(req,resp){
let   resultat={};
let genrefollowers=[];
  let rowData = {};
  if(k==1){

    for(var i=0;i<csvData.length;i++)
    {

      if(resultat[csvData[i].Genre]==null)
      {
          resultat[csvData[i].Genre]=parseInt(csvData[i].Followers);
      }
      else{
        resultat[csvData[i].Genre]=(parseInt(resultat[csvData[i].Genre])+parseInt(csvData[i].Followers));
      }
    }
    resp.send(JSON.stringify(resultat));
}
});


*/
