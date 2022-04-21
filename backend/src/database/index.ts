import "dotenv/config";
import { DataSource } from "typeorm"
import { Settings } from "../models/settings.model"
import path from "path"
import { Symbols } from "../models/symbols.model"
const db = new DataSource({
    type: "mssql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Settings, Symbols],
    migrations: [path.resolve(__dirname, "./migrations/*.ts").toString()],
    migrationsTableName: "migrations",
})

export default db