var express = require('express');
var WebSocket = require('ws');
var app = express();


//use client's index.html
app.use(express.static('../client'));

app.get('/', function(req, res){
	console.log(req);
});

app.listen(3000);