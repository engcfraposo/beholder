import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import BlacklistController from '../modules/sessions/controllers/blacklist.controller';
import SessionController from '../modules/sessions/controllers/session.controller';
import exchangeRoutes from './exchange.routes';
import settingsRoutes from './settings.routes';
import symbolsRoutes from './symbols.routes';

const routes = express.Router();

routes.post("/sessions", SessionController.create);
routes.post("/logout", authMiddleware, BlacklistController.create);

routes.use("/settings", authMiddleware, settingsRoutes);
routes.use("/symbols", authMiddleware, symbolsRoutes);
routes.use("/exchange", authMiddleware, exchangeRoutes);

export default routes;