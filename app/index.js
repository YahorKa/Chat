// app/index.js
const http = require('http');
const fs = require("fs");
const WebSocket = require('ws');
const hostname = '127.0.0.1';
const port = 8080;
var clients = {};
var id = 0;
var server = http.createServer(function(req, res){
  filePath='app'+req.url;
    fs.readFile(filePath,function (err, data){

      if (err) {
        console.log(err);
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        console.log("Url: " + req.url);
       // console.log(req.headers);
        res.end();
      }
    });
}).listen(port);
function echoToAll (mes) {
  Object.keys(clients).forEach((item, i) => {
      clients[item].send(mes);
  });
}
const wsServer = new WebSocket.Server({port:8081});
wsServer.on('connection', onConnect);
function onConnect(wsClient){
let number = id;
id +=1;
clients[number] = wsClient;
console.log('Новый клиент : [id] ' +number + ' Всего клиентов : '+ Object.keys(clients).length);
wsClient.on('message',function(message){echoToAll(message);
console.log(message);
})
wsClient.on('close',function(){console.log('Клиент : [id] ' +number +' вышел');
delete clients[number];
console.log('--> Всего клиентов : '+ Object.keys(clients).length);

})};
