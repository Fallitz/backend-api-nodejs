const express = require('express');
const Router = express.Router();

const authRouters = require('./modules/auth/routers/authRouters');
const userRouters = require('./modules/user/routers/userRouters'); 
const sellerRouters = require('./modules/seller/routers/sellerRouters');
const productRouters = require('./modules/product/routers/productRouters');

//MODULES ROUTERS
Router.use("/auth", authRouters);
Router.use("/users", userRouters);
Router.use("/sellers", sellerRouters);
Router.use("/product", productRouters);

module.exports = Router;