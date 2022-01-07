const express = require('express');
const Router = express.Router();

const AuthenticateToken = require('./middleware/authenticateToken');
const UsersController = require('./modules/user/controllers/usersController');
const AuthController = require('./modules/auth/controllers/authController');
const SellerController = require('./modules/seller/controllers/sellersController');

//USERS
Router.post('/users/register', UsersController.create);                                                         //REGISTER USER
Router.get('/users/getUser', AuthenticateToken, UsersController.getUser);                                       //GET USER
//Router.put('/users/update/:id', AuthenticateToken, UsersController.update);                                   //UPDATE USER
//Router.delete('/users/delete', AuthenticateToken, UsersController.delete);                                    //DELETE USER

//AUTH
Router.post('/users/auth', AuthController.auth);                                                                //AUTHENTICATE USER
//Router.get('/users/login', AuthenticateToken , AuthController.login);                                         //LOGIN USER
Router.delete('/users/logout', AuthenticateToken, AuthController.logout);                                       //LOGOUT USER
Router.post('/users/refreshToken', AuthenticateToken, AuthController.refreshToken);                             //REFRESH TOKEN
//Router.post('/users/auth/forgot' , AuthController.forgot);                                                    //FORGOT PASSWORD
//Router.get('/users/auth/forgot' , AuthController.alterPassword);                                              //ALTER PASSWORD

Router.post('/sellers/create', AuthenticateToken, SellerController.create);                                     //CREATE SELLER
Router.get('/sellers/getSeller/', AuthenticateToken, SellerController.getSeller);                               //GET SELLER BY TOKEN
Router.get('/sellers/getSellerById/:id', AuthenticateToken, SellerController.getSeller);                        //GET SELLER BY ID
Router.get('/sellers/listSellers/:lim/:skip', AuthenticateToken, SellerController.listSellers);                 //LIST SELLERS
Router.get('/sellers/searchSellers/:lim/:skip', AuthenticateToken, SellerController.searchSellers);             //SEARCH SELLERS

module.exports = Router