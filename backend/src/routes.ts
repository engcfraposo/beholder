import express from 'express';
import authMiddleware from './middlewares/auth.middleware';
import BlacklistController from './modules/sessions/controllers/blacklist.controller';
import SessionController from './modules/sessions/controllers/session.controller';
import SettingsController from './modules/sessions/controllers/settings.controller';

const routes = express.Router();

routes.post("/sessions", SessionController.create);
routes.post("/logout", authMiddleware, BlacklistController.create);

routes.get("/settings", authMiddleware, SettingsController.index);

export default routes;