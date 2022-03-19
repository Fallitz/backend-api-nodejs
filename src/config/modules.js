const signale = require('signale');
const auth = require('../modules/auth/module/authModule')
const user = require('../modules/user/module/userModule');
const seller = require('../modules/seller/module/sellerModule');
const cart = require('../modules/cart/module/cartModule');
const product = require('../modules/product/module/productModule');

class Modules {

    async initModules(db){
        try{
            await this.initAuth(db);
            await this.initUser(db);
            await this.initSeller(db);
            await this.initCart(db);
            await this.initProduct(db);
            signale.success('Modules Started');
            
        }catch{
            signale.error('Modules Not Started');
        }
    }
    
    async initAuth(db){
        this.Auth = auth.init(db);
    }
    async initUser(db){
        this.User = user.init(db);
    }
    async initSeller(db){
        this.Seller = seller.init(db);
    }
    async initCart(db){
        this.Cart = cart.init(db);
    }
    async initProduct(db){
        this.Product = product.init(db);
    }

}

module.exports = new Modules();