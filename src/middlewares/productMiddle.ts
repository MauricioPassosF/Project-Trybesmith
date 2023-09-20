import { NextFunction, Request, Response } from 'express';
import { mapStatusHTTP } from '../utils/statusByHTTP';

const nameValidations = (name: unknown) => {
  if (!name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }
  if (typeof name !== 'string') {
    return { status: 'UNPROCESSABLE', data: { message: '"name" must be a string' } };
  }
  if (name.length <= 2) {
    return {
      status: 'UNPROCESSABLE',
      data: { message: '"name" length must be at least 3 characters long' },
    };
  }
};

const priceValidations = (price:unknown) => {
  if (!price) {
    return { status: 'BAD_REQUEST', data: { message: '"price" is required' } };
  }
  if (typeof price !== 'string') {
    return { status: 'UNPROCESSABLE', data: { message: '"price" must be a string' } };
  }
  if (price.length <= 2) {
    return {
      status: 'UNPROCESSABLE',
      data: { message: '"price" length must be at least 3 characters long' },
    };
  }
};

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body;
  const nameValidate = nameValidations(name);
  const priceValidate = priceValidations(price);
  if (nameValidate) {
    const { data, status } = nameValidate;
    return res.status(mapStatusHTTP(status)).json(data);
  }
  if (priceValidate) {
    const { data, status } = priceValidate;
    return res.status(mapStatusHTTP(status)).json(data);
  }
  next();
};

export default {
  validateFields,
};
