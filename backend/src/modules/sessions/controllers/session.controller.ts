import express from "express";
import SessionService from "../services/session.service";

const SessionController = {
    async create (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { email, password } = req.body;

      const data = await SessionService({ email, password });

      res.status(200).json({
        error: {},
        data,
        message: "Success",
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      next(error);
    }
  },
}

export default SessionController;