const WebSocket = require('ws');

var wss = null;

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}
function onMessage(ws, data) {
    const json = JSON.parse(data);
    wss.broadcast(`${json.username + ': ' + json.message}`);
    ws.send('Eu: '+ `${json.message}`);  
}
function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    ws.on('close', () => console.log(`Client disconnected in WebSocket Server: ${req.connection.remoteAddress}`));
    console.log(`Client connected in WebSocket Server: ${req.connection.remoteAddress}`);
}
 
module.exports = (server) => {
    wss = new WebSocket.Server({ server });
       
    wss.on('connection', onConnection);

    wss.broadcast = function broadcast(msg) {
        wss.clients.forEach(function(client) {
            client.send(msg.toString());
        });
    };

    console.log(`App Web Socket Server is running!`);

    return wss;
}