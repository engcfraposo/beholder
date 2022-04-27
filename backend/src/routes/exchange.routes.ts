import express from 'express';
import ExchangeController from '../modules/exchange/controllers/exchange.controller';

const exchangeRoutes = express.Router();


exchangeRoutes.get("/balance", ExchangeController.index);


export default exchangeRoutes;