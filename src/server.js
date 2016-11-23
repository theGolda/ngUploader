'use strict';

const express = require('express');
const server = express();
const port = 3000;

server.use(express.static(__dirname));

server.listen(port);

console.log('Server listening at localhost change: ' + port + '/');