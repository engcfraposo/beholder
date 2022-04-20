# beholder
Multicoin tradebot for finance

# Pré requisitos

- Git (https://git-scm.com/)
- Node (https://nodejs.org)
- Azure (https://azure.microsoft.com/)
- Yarn (https://yarnpkg.com/)

## Clonando o Repositório ##
Com o Git e o Node.js instalado na sua maquina e a **URL** do projeto em mãos, cria em algum lugar do seu pc uma pasta para criarmos uma copia do repositório, dentro dela abra o **cmd** ou **powershell** e digite os comandos abaixo:
```
git clone https://github.com/engcfraposo/beholder.git
cd video-maker
yarn
```
## Pacotes utilizados ##

- Formik (https://formik.org/docs/overview)
- Yup (https://www.npmjs.com/package/yup)
- Volt (https://demo.themesberg.com/volt/)
- Context API (https://pt-br.reactjs.org/docs/context.html)
- Typeorm (https://typeorm.io/)
- Binance (https://www.npmjs.com/package/node-binance-api)
- Azure SQL (https://azure.microsoft.com/pt-br/services/sql-database/)
- Azure Storage (https://azure.microsoft.com/pt-br/services/storage/)
- Azure CDN (https://azure.microsoft.com/pt-br/services/cdn/)

## Api: Binance ##
A api da Binance é gratuita e de livre acesso, pra isso você precisa acessar o site do [Binanve](https://www.binance.com/), aqui não tem muito segredo.

- Pagina api/index.ts
```js
import axios from "axios";

const api = axios.create({
    baseURL: 'API_DA_BINANCE',
});

export default api
```

## Banco de Dados: Azure SQL  ##
É necessário criar o banco de dados para o azure, pra isso você precisa acessar o site do [Azure](https://azure.microsoft.com/) e utilizar as variaveis de ambiente com o typeorm para conectar o banco.

```js
const db = new DataSource({
    type: "mssql",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Settings, Symbols],
    migrations: [path.resolve(__dirname, "./migrations/*.ts").toString()],
    migrationsTableName: "migrations",
})
```