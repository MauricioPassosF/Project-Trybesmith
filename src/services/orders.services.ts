import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

// type ProductIds = { products: number[] };
// type GetAllOrdersResponseData = Order & ProductIds;
// export type CreateProductResponse = ServiceResponse<CreateProductResponseData>;
export type GetAllOrdersResponse = ServiceResponse<Order[]>;

const getAll = async (): Promise<GetAllOrdersResponse> => {
  const modelResponse = await OrderModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    }],
  });
  const orders = modelResponse.map((order) => order.toJSON());
  const formattedOrders = orders.map(({ id, userId, productIds }) => {
    const productsid = (productIds as { id: number }[]).map((product) => product.id);
    return { id, userId, productIds: productsid };
  });
  return { status: 'SUCCESSFULL', data: formattedOrders };
};

export default {
  getAll,
};
