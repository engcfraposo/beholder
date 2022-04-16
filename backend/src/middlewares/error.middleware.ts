import express from 'express';

export default async (error: any, _req: express.Request, res: express.Response) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res.status(status).json({ 
    data: {},
    message,
    timestamp: new Date().toISOString(), 
  });
}