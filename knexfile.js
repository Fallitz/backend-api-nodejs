require("dotenv").config();

module.exports = {
  development:{
    debug: true,
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/config/migrations`
    }
  },
  production:{
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/config/migrations`
    }
  }
};