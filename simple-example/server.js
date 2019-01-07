"use strict";

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');
var request = require('request');
var app = express();

// serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
// also add the path of the libs that are stored in our node_modules directory
app.use('/angular',express.static(path.join(__dirname, 'node_modules/angular')));
app.use('/bootstrap',express.static(path.join(__dirname, 'node_modules/bootstrap')));
app.use('/jquery',express.static(path.join(__dirname, 'node_modules/jquery')));
app.use('/d3',express.static(path.join(__dirname, 'node_modules/d3')));

// if the server is asked for some data, request it from data.nantes.fr and send it back to the browser
app.get('/data', function(req,res){
  // request object come from the 'request' module for nodejs. It simplifies requests programming.  See its documentation for more details
  request('http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  })
})

module.exports = app;
