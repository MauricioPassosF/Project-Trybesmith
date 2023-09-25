import { Router } from 'express';
import ordersControllers from '../controllers/orders.controllers';
import tokenMiddle from '../middlewares/tokenMiddle';
import orderMiddle from '../middlewares/orderMiddle';

const ordersRouter = Router();

ordersRouter.get(
  '/',
  ordersControllers.getAll,
);

ordersRouter.post(
  '/',
  tokenMiddle.validateFields,
  tokenMiddle.validateBearerToken,
  orderMiddle.validateFields,
  ordersControllers.create,
);

export default ordersRouter;