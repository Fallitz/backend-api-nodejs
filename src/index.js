require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const cors = require('cors');
const morgan = require('morgan');
const signale = require('signale');
const routes = require('./routes');
const knex = require('./config/database');
const mongo = require('./config/mongodb');
var path = require('path');
var rfs = require('rotating-file-stream');
var timexe = require( 'timexe' );

async function start() {
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
    app.use(helmet());
    app.use(express.json());


    //LOGGING
    var accessLogStream = rfs.createStream("access.log", {size: "10M", interval: "1d", compress: "gzip", path: path.join(__dirname, '../log')});
    morgan.token('token', function getId (req) {return req.headers['access-token'];});
    app.use(morgan(':remote-addr - - [:date[clf]] ":method :url HTTP/:http-version" Status=:status Size=:res[content-length] Referrer=":referrer" User-Agent":user-agent" Response-Time=:response-time Token=":token"', {skip: function(req, res){return res.statusCode < 400 }}));
    app.use(morgan(':remote-addr - - [:date[clf]] ":method :url HTTP/:http-version" Status=:status Size=:res[content-length] Referrer=":referrer" User-Agent":user-agent" Response-Time=:response-time Token=":token"', {stream: accessLogStream}));


    //HOME PAGE
    app.use(express.static("public"));
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname+'/../public/index.html'));
    });


    //ROUTERS
    const APP_VERSION = process.env.APP_VERSION;
    app.use(`/api/${APP_VERSION}`, routes);


    //DATABASE INIT
    await mongo.init();


    //SERVER LISTEN
    const PORT = process.env.APP_PORT;
    const server = app.listen(PORT, () => {
        signale.success(`Server Running on Port ${PORT}`);
    });


    //SOCKET START
    const appWebSocket = require('./socket');
    appWebSocket(server);


    //REMOVE INVALID TOKENS
    timexe ("* * * 0-23 / 1" ,  function ( ) {  
        const validade = new Date(Date.now() - (1000* 60 * 20)); // 20 minutos
        knex('tokens').where('created_at', '<', validade).del();
        // * * * 0-23 / 1                   //A CADA 1 minuto
        //* * w1-7 / 3                      //A CADA 3 horas
    });

}

start();
