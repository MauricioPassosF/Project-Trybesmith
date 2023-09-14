import { Request, Response } from 'express';
import productsServices from '../services/products.services';
import { mapStatusHTTP } from '../utils/statusByHTTP';

const create = async (req: Request, res: Response) => {
  const { name, price, orderId } = req.body;
  const { data, status } = await productsServices.create({ name, price, orderId });
  res.status(mapStatusHTTP(status)).json(data);
};

export default {
  create,
};