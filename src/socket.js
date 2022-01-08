const WebSocket = require('ws');
const signale = require('signale');
var wss = null;

function onError(ws, err) {
    signale.error(`onError: ${err.message}`);
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
    signale.info(`Client connected in WebSocket Server: ${req.connection.remoteAddress}`);
}
 
module.exports = (server) => {
    wss = new WebSocket.Server({ server });
       
    wss.on('connection', onConnection);

    wss.broadcast = function broadcast(msg) {
        wss.clients.forEach(function(client) {
            client.send(msg.toString());
        });
    };

    signale.success(`Web Socket Server Running on Port ${process.env.APP_PORT}`);

    return wss;
}