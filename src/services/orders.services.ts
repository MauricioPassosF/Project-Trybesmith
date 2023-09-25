import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

export type GetAllOrdersResponse = ServiceResponse<Order[]>;
type CreateOrderData = {
  userId: number;
  productIds: number[];
};
export type CreateOrderResponse = ServiceResponse<CreateOrderData>;
const getAll = async (): Promise<GetAllOrdersResponse> => {
  const modelResponse = await OrderModel.findAll({
    include: [
      {
        model: ProductModel,
        as: 'productIds',
        attributes: ['id'],
      },
    ],
  });
  const orders = modelResponse.map((order) => order.toJSON());
  const formattedOrders = orders.map(({ id, userId, productIds }) => {
    const productsid = (productIds as { id: number }[]).map((product) => product.id);
    return { id, userId, productIds: productsid };
  });
  return { status: 'SUCCESSFULL', data: formattedOrders };
};

const create = async ({ userId, productIds }: CreateOrderData): Promise<CreateOrderResponse> => {
  const userModelResponse = await UserModel.findByPk(userId);
  if (!userModelResponse) {
    return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };
  }
  const orderModelResponse = await OrderModel.create({ userId });
  const { id } = orderModelResponse.dataValues;
  const productModelResponse = productIds.map(async (productId) => {
    await ProductModel.update({ orderId: id }, { where: { id: productId } });
  });
  Promise.all(productModelResponse);
  return { status: 'CREATED', data: { userId, productIds } };
};

export default {
  getAll,
  create,
};
