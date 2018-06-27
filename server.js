const server = require('pushstate-server');

server.sstart({
  port: 3000,
  directory: './build'
});