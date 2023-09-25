import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/token';

type JWTreturn = { data:{ id:number } };

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  if (!req.header('Authorization')) {
    return res.status(401).json({ message: 'Token not found' });
  }
  next();
};

const validateBearerToken = (req: Request, res: Response, next: NextFunction) => {
  const responseJWT = validateToken(req.header('Authorization') as string) as JWTreturn;
  if (!responseJWT) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  // const { id } = responseJWT.data;
  // res.locals.id = id;
  next();
};

export default {
  validateBearerToken,
  validateFields,
};