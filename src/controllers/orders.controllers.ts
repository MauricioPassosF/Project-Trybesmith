import { Request, Response } from 'express';
import ordersServices from '../services/orders.services';
import { mapStatusHTTP } from '../utils/statusByHTTP';

const getAll = async (req: Request, res: Response) => {
  const { data, status } = await ordersServices.getAll();
  res.status(mapStatusHTTP(status)).json(data);
};  

const create = async (req: Request, res: Response) => {
  const { data, status } = await ordersServices.create(req.body);
  res.status(mapStatusHTTP(status)).json(data);
}; 

export default {
  getAll, create,
};