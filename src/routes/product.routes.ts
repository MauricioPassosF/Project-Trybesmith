import { Router } from 'express';
import productControllers from '../controllers/product.controllers';
import productMiddle from '../middlewares/productMiddle';

const productRouter = Router();

productRouter.post(
  '/',
  productMiddle.validateFields,
  productControllers.create,
);

productRouter.get(
  '/',
  productControllers.getAll,
);

export default productRouter;