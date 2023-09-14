import { Router } from 'express';
import ordersControllers from '../controllers/orders.controllers';

const ordersRouter = Router();

ordersRouter.get(
  '/',
  ordersControllers.getAll,
);

export default ordersRouter;