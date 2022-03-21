const express = require('express');

const AuthenticateToken = require('../../../middleware/authenticateToken');
const SellersController = require('../controllers/sellerController');

class sellerRouter {
    static getRouter() {

        const Router = express.Router();
        
        Router.post('/create', AuthenticateToken, SellersController.create);                                     //CREATE SELLER
        Router.get('/getSeller/', AuthenticateToken, SellersController.getSeller);                               //GET SELLER BY TOKEN
        Router.get('/getSellerById/:id', AuthenticateToken, SellersController.getSeller);                        //GET SELLER BY ID
        Router.get('/listSellers/:lim/:skip', AuthenticateToken, SellersController.listSellers);                 //LIST SELLERS
        Router.get('/searchSellers/:lim/:skip', AuthenticateToken, SellersController.searchSellers);             //SEARCH SELLERS
            
        return Router;
    }
}

module.exports = sellerRouter.getRouter();
