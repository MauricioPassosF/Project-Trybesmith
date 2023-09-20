import { Request, Response } from 'express';
import loginServices from '../services/login.services';
import { mapStatusHTTP } from '../utils/statusByHTTP';

const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { data, status } = await loginServices.authenticate({ username, password });
  res.status(mapStatusHTTP(status)).json(data);
};  

export default {
  authenticate,
};
