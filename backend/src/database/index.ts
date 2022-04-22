import "dotenv/config";
import { DataSource } from "typeorm"
import path from "path"

const db = new DataSource({
    type: "mssql",
    synchronize: true,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
      __dirname, "**/*.model{.ts,.js}" 
    ],
    migrations: [
      __dirname, "./migrations/*{.ts,.js}"
    ],
    migrationsTableName: "migrations",
})

export default db