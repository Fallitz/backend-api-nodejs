const express = require('express');

const AuthenticateToken = require('../../../middleware/authenticateToken');
const CartController = require('../controllers/cartController');

class userRouter {
    static getRouter() {

        const Router = express.Router();
    
        Router.post('/create', AuthenticateToken ,CartController.create);                                                                    //CREATE CART
        Router.post('/toAdd', AuthenticateToken ,CartController.toAdd);                                                                      //ADD PRODUCT TO CART

        return Router;
    }
}

module.exports = userRouter.getRouter();
