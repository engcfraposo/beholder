import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import "express-async-errors"
import errors from './middlewares/error.middleware';
import routes from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errors);

export default app;