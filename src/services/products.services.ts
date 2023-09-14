import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

type CreateProductResponseData = { id: number, name: string, price: string };
export type CreateResponse = ServiceResponse<CreateProductResponseData>;

const create = async (productInfos: ProductInputtableTypes): Promise<CreateResponse> => {
  const modelResponse = await ProductModel.create(productInfos);
  const { id, name, price } = modelResponse.dataValues; 
  return { status: 'CREATED', data: { id, name, price } };
}; 

export default {
  create,
};