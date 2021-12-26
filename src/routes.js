const express = require('express');
const Router = express.Router();

const AuthenticateToken = require('./middleware/authenticateToken');
const UsersController = require('./controllers/users/usersController');
const AuthController = require('./controllers/auth/authController');

//USERS
Router.post('/users', UsersController.create);                                              //REGISTER USER
Router.get('/users/:id?', AuthenticateToken, UsersController.get);                          //GET USER
Router.put('/users/:id', AuthenticateToken, UsersController.update);                        //UPDATE USER
Router.delete('/users', AuthenticateToken, UsersController.delete);                         //DELETE USER

//AUTH
Router.post('/auth', AuthController.auth);                                                  //AUTHENTICATE USER
Router.get('/login', AuthenticateToken , AuthController.login);                             //LOGIN USER
Router.delete('/logout', AuthController.logout);                                            //LOGOUT USER
Router.post('/refreshToken', AuthenticateToken, AuthController.refreshToken);               //REFRESH TOKEN
Router.post('/auth/forgot' , AuthController.forgot);                                        //FORGOT PASSWORD
Router.get('/auth/forgot' , AuthController.alterPassword);                                  //ALTER PASSWORD


module.exports = Router