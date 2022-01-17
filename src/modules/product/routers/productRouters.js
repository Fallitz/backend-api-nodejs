const express = require('express');

const AuthenticateToken = require('../../../middleware/authenticateToken');
const ProductController = require('../controllers/productController');

class userRouter {
    static getRouter() {

        const Router = express.Router();
    
        Router.post('/', AuthenticateToken ,ProductController.create);                                                                  //CREATE PRODUCT
        Router.get('/:id', AuthenticateToken ,ProductController.getById);                                                               //GET PRODUCT BY ID
        Router.get('/seller/:id', AuthenticateToken ,ProductController.getBySellerId);                                                  //GET PRODUCT BY SELLER ID

        return Router
    }
}

module.exports = userRouter.getRouter();
