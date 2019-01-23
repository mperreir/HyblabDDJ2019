'use strict';

// general routing framework
var express = require('express')
//var basicAuth = require('basic-auth-connect');
var app = express()

// password protection
//app.use(basicAuth('ddj2019', 'iloveddj'));

// declare the list of sub apps
var app_names = ['simple-example', 'air-pdl1', 'air-pdl2', 'euradio', 'music-data', 'press-pepper',
 'region-pdl-aides', 'region-pdl-audio', 'ville-saint-nazaire1', 'ville-saint-nazaire2'];

var ddj2019_names = [];

app_names.push.apply(app_names, ddj2019_names);

var sub_apps = [];

// create sub apps
// and register sub-apps
app_names.forEach( function( element, index, array) {
  console.log('Registering: ' + element);
	sub_apps[element] = require('./' + element + '/server');
	app.use('/' + element, sub_apps[element]);
});

// redirect catch all url to hyblab website
app.use(/\/$/,function(req, res, next){
	res.redirect('http://www.hyblab.fr/');
});


// launch main server app

//attention remettre le port a 8080 ...
var port = 'PORT' in process.env ? process.env.PORT : 80;
var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Hyblab routing app listening at http://%s:%s', host, port)

})
