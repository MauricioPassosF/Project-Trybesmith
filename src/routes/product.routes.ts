import { Router } from 'express';
import productControllers from '../controllers/product.controllers';

const productRouter = Router();

productRouter.post(
  '/',
  productControllers.create,
);

productRouter.get(
  '/',
  productControllers.getAll,
);

export default productRouter;