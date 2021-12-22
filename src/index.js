require("dotenv").config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const routes = require('./routes');
const APP_VERSION = process.env.APP_VERSION;
app.use(`/api/${APP_VERSION}`, routes);

const PORT = process.env.APP_PORT;
const server = app.listen(PORT, () => {
    console.info(`Server Running on Port ${PORT}`);
})

const appWebSocket = require('./socket');
appWebSocket(server);