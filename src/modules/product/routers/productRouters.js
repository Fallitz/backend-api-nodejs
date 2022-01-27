const express = require('express');

const AuthenticateToken = require('../../../middleware/authenticateToken');
const ProductController = require('../controllers/productController');

class userRouter {
    static getRouter() {

        const Router = express.Router();
    
        Router.post('/create', AuthenticateToken ,ProductController.create);                                                                    //CREATE PRODUCT
        Router.get('/getById/:id', AuthenticateToken ,ProductController.getById);                                                               //GET PRODUCT BY ID
        Router.get('/getBySellerId/:lim/:skip', AuthenticateToken ,ProductController.getBySellerId);                                            //GET PRODUCTS BY SELLER ID
        Router.get('/getByCategoryId/:lim/:skip', AuthenticateToken ,ProductController.getByCategoryId);                                        //GET PRODUCTS BY CATEGORY ID
        Router.get('/listProducts/:lim/:skip', AuthenticateToken ,ProductController.listProducts);                                              //LIST PRODUCTS
        Router.get('/searchProducts/:lim/:skip', AuthenticateToken ,ProductController.searchProduct);                                           //SEARCH PRODUCTS
        Router.get('/getProductByName/:name', AuthenticateToken ,ProductController.getProductByName);                                           //GET PRODUCT BY NAME

        return Router
    }
}

module.exports = userRouter.getRouter();
