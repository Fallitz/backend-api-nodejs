require("dotenv").config();
const { MongoClient } = require('mongodb');
const signale = require('signale');

const auth = require('../modules/auth/models/authModel');
const user = require('../modules/user/models/userModel');
const seller = require('../modules/seller/models/sellerModel');
const cart = require('../modules/cart/models/cartModel');
const product = require('../modules/product/models/productModel');

class MongoBot {

  constructor() {
        this.client = new MongoClient(process.env.MONGODB_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    async init() {
        signale.info('Conectando ao MongoDb...');
    
        await this.client.connect();
        this.db = this.client.db(process.env.MONGODB_DBNAME);

        this.Auth = new auth(this.db);
        this.User = new user(this.db);
        this.Seller = new seller(this.db);
        this.Cart = new cart(this.db);
        this.Product = new product(this.db)
        
        signale.success('Conectado ao MongoDb');
    }

}

module.exports = new MongoBot();