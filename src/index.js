require("dotenv").config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const cors = require('cors');
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(helmet());

app.use(express.json());

//LOGGING
var data = new Date();
app.use(morgan('common', {skip: function(req, res){return res.statusCode < 400 }}));
app.use(morgan('combined', {stream: fs.createWriteStream('./log/' + data.getUTCDate() + (data.getMonth() + 1) + data.getFullYear() + '.log', {flags: 'a'})}));

const routes = require('./routes');
const APP_VERSION = process.env.APP_VERSION;
app.use(`/api/${APP_VERSION}`, routes);

const PORT = process.env.APP_PORT;
const server = app.listen(PORT, () => {
    console.info(`Server Running on Port ${PORT}`);
})

const appWebSocket = require('./socket');
const { noUnknown } = require("./models/util/http/validators/user");
appWebSocket(server);