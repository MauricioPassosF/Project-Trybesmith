import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

type CreateProductResponseData = { id: number, name: string, price: string };
export type CreateProductResponse = ServiceResponse<CreateProductResponseData>;
export type GetAllProductsResponse = ServiceResponse<Product[]>;

const create = async (productInfos: ProductInputtableTypes): Promise<CreateProductResponse> => {
  const modelResponse = await ProductModel.create(productInfos);
  const { id, name, price } = modelResponse.dataValues; 
  return { status: 'CREATED', data: { id, name, price } };
}; 

const getAll = async ():Promise<GetAllProductsResponse> => {
  const modelResponse = await ProductModel.findAll();
  const products = modelResponse.map((product) => product.toJSON());
  return { status: 'SUCCESSFULL', data: products };
};

export default {
  create,
  getAll,
};