const WebSocket = require('ws');
const signale = require('signale');
var wss = null;

function onError(ws, err) {
    signale.error(`onError: ${err.message}`);
}
function onMessage(ws, data) {



    //DADOS ENVIADOS PELO CLIENTE
    const json = JSON.parse(data);

        switch (json.action) {
            case 'sendMessage': //ENVIAR MENSAGEM PARA TODOS
                wss.broadcast(`{${json.id + ' : '+  json.message}}`);
                ws.send(`{${json.id + ' : '+  json.message}}`);  
                console.log(wss.clients);

                break;
            case 'sendMessageTo': //ENVIAR MENSAGEM PARA UM USUÁRIO
                wss.clients.forEach(function(client) {
                    console.log(client.id);
                    if (client.id === json.id) {
                        client.send(json.message);
                    }
                });
                break;
            case 'sendMessageToAll': //ENVIAR MENSAGEM PARA TODOS
                wss.clients.forEach(function(client) {
                    client.send(json.message);
                }
                );
                break;
            case 'sendMessageToAllExcept': //ENVIAR MENSAGEM PARA TODOS EXCETO UM USUÁRIO
                wss.clients.forEach(function(client) {
                    if (client.id !== json.id) {
                        client.send(json.message);
                    }
                }
                );
                break;
        }
  
}
function onConnection(ws, req) {
    ws.on('id', (id) => { ws.id = id;});
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