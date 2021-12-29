const express = require('express');
const Router = express.Router();

const AuthenticateToken = require('./middleware/authenticateToken');
const UsersController = require('./controllers/user/usersController');
const AuthController = require('./controllers/auth/authController');
const SellerController = require('./controllers/seller/sellersController');

//USERS
Router.post('/users/register', UsersController.create);                                              //REGISTER USER
Router.get('/users/getUser', AuthenticateToken, UsersController.getUser);                          //GET USER
//Router.put('/users/update/:id', AuthenticateToken, UsersController.update);                        //UPDATE USER
//Router.delete('/users/delete', AuthenticateToken, UsersController.delete);                         //DELETE USER

//AUTH
Router.post('/users/auth', AuthController.auth);                                                  //AUTHENTICATE USER
//Router.get('/users/login', AuthenticateToken , AuthController.login);                             //LOGIN USER
Router.delete('/users/logout', AuthenticateToken, AuthController.logout);                         //LOGOUT USER
Router.post('/users/refreshToken', AuthenticateToken, AuthController.refreshToken);               //REFRESH TOKEN
//Router.post('/users/auth/forgot' , AuthController.forgot);                                        //FORGOT PASSWORD
//Router.get('/users/auth/forgot' , AuthController.alterPassword);                                  //ALTER PASSWORD

Router.post('/sellers/create', AuthenticateToken, SellerController.create);                  //CREATE SELLER

module.exports = Router