import express from 'express';
import SettingsController from '../modules/sessions/controllers/settings.controller';

const settingsRoutes = express.Router();


settingsRoutes.get("/", SettingsController.index);
settingsRoutes.patch("/", SettingsController.update);


export default settingsRoutes;