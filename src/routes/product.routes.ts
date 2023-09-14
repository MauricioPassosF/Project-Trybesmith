import { Router } from 'express';
import productControllers from '../controllers/product.controllers';

const productRouter = Router();

productRouter.post(
  '/',
  productControllers.create,
);

export default productRouter;