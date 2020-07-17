var path = require('path');
var crud = require( path.resolve( __dirname, "./crud.js" ) );
var heartbeat = require( path.resolve( __dirname, "./heartbeat.js" ) );

var webSocketServer = require('websocket').server;
var http = require('http');


var webSocketsServerPort = 1337
var server = http.createServer(function(request, response) {
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});

var wsServer = new webSocketServer({
  httpServer: server
});

wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin '
      + request.origin + '.');  

  var connection = request.accept(null, request.origin); 

  const delayReport = deplayMs => new Promise((resolve) => {
    setTimeout(resolve, deplayMs);
  });
  setInterval(async () => {
    connection.sendUTF(heartbeat.heartbeat())
    await delayReport(1000); 
   }, 1000);
  connection.sendUTF(heartbeat.heartbeat())


  connection.on('message', function(message) {
	console.log("received some data...")
    if (message.type === 'utf8') { 
        crud.adapter(message.utf8Data)
    }
  })
  connection.on('close', function(connection) {
	console.log("connection closed...")
  });
});





