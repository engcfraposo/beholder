import express from 'express';
import SymbolsController from '../modules/symbols/controllers/symbols.controller';

const symbolsRoutes = express.Router();

symbolsRoutes.get("/", SymbolsController.index);
symbolsRoutes.get("/:symbol", SymbolsController.index);
symbolsRoutes.patch("/:symbol", SymbolsController.update);

symbolsRoutes.post("/sync", (_req, res) => {
  res.json({ ok: true });
})

export default symbolsRoutes;