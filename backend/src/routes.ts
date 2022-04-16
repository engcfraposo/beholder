import express from 'express';
import SessionController from './modules/sessions/controllers/session.controller';

const routes = express.Router();

routes.post("/sessions", SessionController.create);

export default routes;