require("dotenv").config()

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mssql",
    logging: true,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    options: {
      encrypt: true,
      database: process.env.DATABASE_NAME
    }
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    dialect: process.env.DATABASE_TYPE,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    options: {
      encrypt: true,
      database: process.env.DATABASE_NAME
    }
  },
}