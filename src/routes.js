const express = require('express');
const Router = express.Router();
const path = require('path');
const Mongodb = require('./config/mongodb');
const signale = require('signale');

const authRouters = require('./modules/auth/routers/authRouters');
const userRouters = require('./modules/user/routers/userRouters'); 
const sellerRouters = require('./modules/seller/routers/sellerRouters');
const productRouters = require('./modules/product/routers/productRouters');

/*
const mongodb = Mongodb.getDb().then(function (db) {
    signale.success('Mongo DataBase Connected');
});*/

Router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

//MODULES ROUTERS
Router.use("/auth", authRouters);
Router.use("/users", userRouters);
Router.use("/sellers", sellerRouters);
Router.use("/products", productRouters);

module.exports = Router;