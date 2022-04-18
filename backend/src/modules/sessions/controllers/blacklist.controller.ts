import express from "express";
import BlacklistService from "../services/blacklist.service";

const BlacklistController = {
    async create (req: express.Request, res: express.Response) {
    try {
      const { authorization } = req.headers;

      const data = BlacklistService({ authorization });

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

export default BlacklistController;