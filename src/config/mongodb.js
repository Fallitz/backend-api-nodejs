require("dotenv").config();
const { MongoClient } = require('mongodb');
const signale = require('signale');


class MongoBot {
  constructor() {
        this.client = new MongoClient(process.env.MONGODB_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    async init() {
        try{
            await this.client.connect();
            this.db = this.client.db(process.env.MONGODB_DBNAME);
            signale.success('MongoDb Connected');
        }catch{
            signale.error('MongoDb Not Connected');
        }   
    }
}

module.exports = new MongoBot();