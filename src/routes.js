const express = require('express');
const Router = express.Router();
const path = require('path');

const authRouters = require('./modules/auth/routers/authRouters');
const userRouters = require('./modules/user/routers/userRouters'); 
const sellerRouters = require('./modules/seller/routers/sellerRouters');
const productRouters = require('./modules/product/routers/productRouters');
const cartRouters = require('./modules/cart/routers/cartRouters');
/*const categoryRouters = require('./modules/category/routers/categoryRouters');
const orderRouters = require('./modules/order/routers/orderRouters');
const paymentRouters = require('./modules/payment/routers/paymentRouters');
const reviewRouters = require('./modules/review/routers/reviewRouters');
const wishlistRouters = require('./modules/wishlist/routers/wishlistRouters');
*/

Router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

//MODULES ROUTERS
Router.use("/auth", authRouters);
Router.use("/users", userRouters);
Router.use("/sellers", sellerRouters);
Router.use("/products", productRouters);
Router.use("/cart", cartRouters);
//Router.use("/categories", categoryRouters);







module.exports = Router;