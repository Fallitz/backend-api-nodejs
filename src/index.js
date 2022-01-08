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
const util = require('./repositories/util/util');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(helmet());
app.use(express.json());

//LOGGING
var data = util.dateFormat(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear());
app.use(morgan('common', {skip: function(req, res){return res.statusCode < 400 }}));
app.use(morgan('combined', {stream: fs.createWriteStream('./log/' + data + '.log', {flags: 'a'})}));

//ROUTERS
const APP_VERSION = process.env.APP_VERSION;
app.use(`/api/${APP_VERSION}`, routes);

//SERVER LISTEN
const PORT = process.env.APP_PORT;
const server = app.listen(PORT, () => {
    signale.success(`Server Running on Port ${PORT}`);
});

const appWebSocket = require('./socket');
appWebSocket(server);