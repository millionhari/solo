var express = require('express');
var cors = require('cors');
var WebSocket = require('ws');
var app = express();


//use client's index.html
app.use(cors());
app.use(express.static('../client'));

app.get('/', function(req, res){
	console.log('hey')
});

app.listen(3000);