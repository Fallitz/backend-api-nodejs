require("dotenv").config();

const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const bodyParser = require('body-parser');

const app = express();
const appWebSocket = require('./socket');
const routes = require('./routes');

const PORT = process.env.APP_PORT;
const APP_VERSION = process.env.APP_VERSION;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use(`/api/${APP_VERSION}`, routes);

const server = app.listen(PORT, () => {
    console.info(`Server Running on Port ${PORT}`);
})

appWebSocket(server);