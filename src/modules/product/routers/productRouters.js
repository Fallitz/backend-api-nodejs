const express = require('express');

const AuthenticateToken = require('../../../middleware/authenticateToken');
const ProductController = require('../controllers/productController');

class userRouter {
    static getRouter() {

        const Router = express.Router();
    
        Router.post('/', ProductController.create);                                                               //CREATE PRODUCT
       
        return Router
    }
}

module.exports = userRouter.getRouter();
