const express = require('express');

const AuthenticateToken = require('../../../middleware/authenticateToken');
const ProductController = require('../controllers/productController');

class userRouter {
    static getRouter() {

        const Router = express.Router();
    
        Router.post('/create', AuthenticateToken ,ProductController.create);                                                                    //CREATE PRODUCT
        Router.get('/getById/:id', AuthenticateToken ,ProductController.getById);                                                               //GET PRODUCT BY ID
        Router.get('/getBySellerId/:sellerId/:lim/:skip', AuthenticateToken ,ProductController.getBySellerId);                                  //GET PRODUCT BY SELLER ID
        Router.get('/getByCategoryId/:categoryId/:lim/:skip', AuthenticateToken ,ProductController.getByCategoryId);                            //GET PRODUCT BY CATEGORY ID
        Router.get('/listProducts/:lim/:skip', AuthenticateToken ,ProductController.listProducts);                                              //LIST PRODUCTS
        Router.get('searchProducts/:search/:lim/:skip', AuthenticateToken ,ProductController.searchProduct);                                    //SEARCH PRODUCTS

        return Router
    }
}

module.exports = userRouter.getRouter();
