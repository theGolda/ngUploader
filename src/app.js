'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);

app.get('/', function(req, res) {

  res.sendfile('app/index.html');

});

app.use(express.static('app'));

server.listen(3000, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});