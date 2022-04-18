import express from 'express';
import jwt from 'jsonwebtoken';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { authorization } = req.headers;
  if(authorization) {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.user = decoded;
    return next();
  }
  return res.status(401).json({
    data: {},
    message: 'Unauthorized',
    timestamp: new Date().toISOString(),
  })
}