import express from "express";
import ExchangeService from "../services/exchange.service";

const ExchangeController = {
    async index (_req: express.Request, res: express.Response) {
    try {
      const { id } = res.locals.user;

      const data = await ExchangeService({ id });

      if(data.error) {
        return res.status(data.status).json({
          data: {},
          message: data.error,
          timestamp: new Date().toISOString(),
        });
      }

      res.status(data.status).json({
        data,
        message: "Success",
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      throw new Error(error);
    }
  },
}

export default ExchangeController;