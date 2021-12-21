const WebSocket = require('ws');
 
function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}
 
function onMessage(ws, data) {
    //console.log(`onMessage: ${data}`);
    if(data == 'ping') {
        ws.send(`{"recebido": "pinggggggg"}`);
    }else{
        ws.send(`${data.username}`);
    }
}
 
function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    console.log(`onConnection ${req.url}`);
}
 
module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });

    wss.on('connection', onConnection);

    console.log(`App Web Socket Server is running!`);
    return wss;

}