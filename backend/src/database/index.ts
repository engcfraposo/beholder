import { DataSource } from "typeorm"
import { Settings } from "../models/settings.model"
import path from "path"
import config from "./config.json"
const db = new DataSource({
    type: "mssql",
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    entities: [Settings],
    migrations: [path.resolve(__dirname, "./migrations/*.ts").toString()],
    migrationsTableName: "migrations",
})

export default db