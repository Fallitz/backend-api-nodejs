const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}
 
function onMessage(ws, data) {
    wss.broadcast(data);
    /*if(data == 'ping') {
        ws.send(`{"recebido": "ping"}`);
    }else{
        try{
            const json = JSON.parse(data);
            ws.send(`${json.username + ': ' + json.message}`);  
        }catch(e){
            ws.send(`Erro: ${e.message}`);
        }
                
    }*/
}

wss.broadcast = function broadcast(msg) {
    //console.log(msg);
    wss.clients.forEach(function(client) {
        client.send(msg.toString());
    });
 };
 
function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    ws.on('close', () => console.log(`Client disconnected in WebSocket Server: ${req.connection.remoteAddress}`));
    console.log(`Client connected in WebSocket Server: ${req.connection.remoteAddress}`);
}
 
module.exports = () => {
  //const wss = new WebSocket.Server({ server });
       
    wss.on('connection', onConnection);

    console.log(`App Web Socket Server is running!`);
    return wss;

}