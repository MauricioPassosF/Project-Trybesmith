import { NextFunction, Request, Response } from 'express';
import { mapStatusHTTP } from '../utils/statusByHTTP';

const userValidations = (userId: unknown) => {
  if (!userId) {
    return { status: 'BAD_REQUEST', data: { message: '"userId" is required' } };
  }
  if (typeof userId !== 'number') {
    return { status: 'UNPROCESSABLE', data: { message: '"userId" must be a number' } };
  }
};

const productsValidations = (productIds:unknown) => {
  if (!productIds) {
    return { status: 'BAD_REQUEST', data: { message: '"productIds" is required' } };
  }
  if (!Array.isArray(productIds)) {
    return { status: 'UNPROCESSABLE', data: { message: '"productIds" must be an array' } };
  }
  if (productIds.length === 0) {
    return {
      status: 'UNPROCESSABLE',
      data: { message: '"productIds" must include only numbers' },
    };
  }
};

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const { userId, productIds } = req.body;
  const userValidate = userValidations(userId);
  const productsValidate = productsValidations(productIds);
  if (userValidate) {
    const { data, status } = userValidate;
    return res.status(mapStatusHTTP(status)).json(data);
  }
  if (productsValidate) {
    const { data, status } = productsValidate;
    return res.status(mapStatusHTTP(status)).json(data);
  }
  next();
};

export default {
  validateFields,
};
