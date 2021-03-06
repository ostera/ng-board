// Server
var io = require('engine.io')
  , server = io.listen(4000);

var i = 0;

server.on('connection', function (socket) {
  setInterval(function () {
    var obj = JSON.stringify({
      label: "dashboard:public",
      data: {
        label: "messageCounter",
        data: i
      }
    });
    console.log("Sending",obj)
    socket.send(obj); 
    i++;
  }, 3000);
});

// transporter
var dio = require('transporter.io')
  , ngBoard = require('transporter.io-ng-board');

// This is the port the dashboard will connect to
ngBoard.serveFiles({
  port: 3000,
  dir: __dirname
});

dio.transports.push(ngBoard);

// Connect to the server at 4000
// and listen to the dashboard:public events
dio.connect('ws://localhost:4000');
dio.subscribe('dashboard:public');