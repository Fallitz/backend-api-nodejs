const express = require('express');
const Router = express.Router();

const authRouters = require('./modules/auth/routes/authRouters');
const userRouters = require('./modules/user/routes/usersRouters'); 
const sellerRouters = require('./modules/seller/routes/sellersRouters');

//MODULES ROUTERS
Router.use("/auth", authRouters);
Router.use("/users", userRouters);
Router.use("/sellers", sellerRouters);

module.exports = Router;