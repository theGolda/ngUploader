'use strict';

const express = require('express');
const server = express();
const port = 3000;

server.use(express.static(__dirname));

server.get('/allFiles', function(req, res){
	console.log("Retrieved files");

});

server.post('/newFile', function(req, res){
	console.log("posted file(s)");

});

server.delete('/deleteFile', function(req, res) {
	console.log("deleted file");

});

server.listen(port);

console.log('Server listening at localhost change: ' + port + '/');