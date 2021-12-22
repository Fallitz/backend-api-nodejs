const WebSocket = require('ws');
 
function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}
 
function onMessage(ws, data) {

    /*ws.broadcast = function broadcast(data) {
        console.log(data);
        ws.clients.forEach(function each(client) {
          client.send(data);
        });
       };*/

       wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
    
    if(data == 'ping') {
        ws.send(`{"recebido": "ping"}`);
    }else{
       /* try{
            const json = JSON.parse(data);
            ws.send(`${json.username + ': ' + json.message}`);  
        }catch(e){
            ws.send(`Erro: ${e.message}`);
        }*/
        //const json = JSON.parse(data);
        //wss.broadcast(`${json.username + ': ' + json.message}`);
        
    }
}
 
function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    ws.on('close', () => console.log(`Client disconnected in WebSocket Server: ${req.connection.remoteAddress}`));
    console.log(`Client connected in WebSocket Server: ${req.connection.remoteAddress}`);
}
 
module.exports = (server) => {
    const wss = new WebSocket.Server({ server });
    
    wss.on('connection', onConnection);

    console.log(`App Web Socket Server is running!`);
    return wss;

}