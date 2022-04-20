import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import BlacklistController from '../modules/sessions/controllers/blacklist.controller';
import SessionController from '../modules/sessions/controllers/session.controller';
import settingsRoutes from './settings.routes';
import symbolsRoutes from './symbols.routes';

const routes = express.Router();

routes.post("/sessions", SessionController.create);
routes.post("/logout", authMiddleware, BlacklistController.create);

routes.use("/settings", authMiddleware, settingsRoutes);
routes.use("/symbols", authMiddleware, symbolsRoutes);

export default routes;