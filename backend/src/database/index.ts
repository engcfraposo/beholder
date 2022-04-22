import "dotenv/config";
import { Sequelize } from "sequelize"

const db = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD as string,
  {
    dialect: "mssql",
    host: process.env.DATABASE_HOST as string,
    port: parseInt(process.env.DATABASE_PORT as string),
    logging: true,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    dialectOptions: {
      encrypt: true
    }
  }
);

export default db