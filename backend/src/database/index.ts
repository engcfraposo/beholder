import "dotenv/config";
import { DataSource } from "typeorm"
import path from "path"

const db = new DataSource({
    type: "mssql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [path.resolve(__dirname, "../models/*.model.ts").toString(), path.resolve(__dirname, "../models/*.model.js").toString()],
    migrations: [path.resolve(__dirname, "./migrations/*.ts").toString(), path.resolve(__dirname, "./migrations/*.js").toString()],
    migrationsTableName: "migrations",
})

export default db