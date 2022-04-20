import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import "express-async-errors"
import errors from './middlewares/error.middleware';
import routes from './routes';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"))
app.use(routes);
app.use(errors);

export default app;