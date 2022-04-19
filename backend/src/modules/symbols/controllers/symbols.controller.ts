import express from "express";
import GetSymbolsService from "../services/get-symbols.service";
import updateSymbolsService from "../services/update-symbols.service";

const SymbolsController = {
    async index (req: express.Request, res: express.Response) {
    try{
      const { symbol } = req.params;
      const data = await GetSymbolsService({ symbol });
      
      if(data.error) {
        return res.status(data.status).json({
          data: {},
          message: data.error,
          timestamp: new Date().toISOString(),
        });
      }

      return res.status(200).json({
        data,
        message: "Success",
        timestamp: new Date().toISOString(),
      });

    } catch (error: any) {
      throw new Error(error);
    }
  },
  async update (req: express.Request, res: express.Response) {
    try {
      const { 
        basePrecision, 
        quotePrecision,
        minLotSize,
        minNotional,
        isFavorite
      } = req.body;

      const { symbol } = req.params;

      const data = await updateSymbolsService({
        symbol,
        basePrecision,
        quotePrecision,
        minLotSize,
        minNotional,
        isFavorite
      });

      if(data.error) {
        return res.status(data.status).json({
          data: {},
          message: data.error,
          timestamp: new Date().toISOString(),
        });
      }

      return res.status(200).json({
        data,
        message: "Success",
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default SymbolsController;