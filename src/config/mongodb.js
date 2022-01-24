require("dotenv").config();
const { Db, MongoClient } = require('mongodb');
const signale = require('signale');


class MongoDb {

    constructor() { }

    async connect() {
        try {
            
            signale.info('conectando ao MongoDb...');
            const mongodbUrl = process.env.MONGODB_URI || 'ENV VAR MONGODB_URL IS NOT DEFINED';
            signale.info('MONGODB_URL: ' + mongodbUrl);
    
            const mongoClient = await MongoClient.connect(mongodbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
    
            signale.info(`MONGODB_DATABASE ${process.env.MONGODB_URI || 'UNDEFINED'}`)
            const Db = mongoClient.db(process.env.MONGODB_URI)
    
            signale.info('conectado ao mongoDb');
    
            return Db;

        } catch (err) {
            console.log(err.stack);
        }
    }
    static async getDb() {
        let dbInstance = Db;
        if (dbInstance) {
            const db = await new MongoDb().connect();
            dbInstance = db;
            return db;
           // return dbInstance;
        } else {
            const db = await new MongoDb().connect();
            dbInstance = db;
            return db;
        }
    }
}

/**

async function main(collection) {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  const collection = db.collection(collection);

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
*/
/*
module.exports ={
    collections: {
        usuario: 'usuario',
        place: 'place',
        municipio: 'municipio',
        produto: 'produto',
        funcionario: 'funcionario',
        analytics: 'analytics',
        carrinho: 'carrinho',
        pedido: 'pedido',
        produtoCategoria: 'produtoCategoria',
        banner: 'banner',
        analytic: 'analytic',
        visitante: 'visitante',
    },
} */

module.exports = MongoDb;

